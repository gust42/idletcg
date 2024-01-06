import { GameState } from "../interfaces/logic";
import RulesHandler, { AllSkills } from "../rules/ruleshandler";
import StateHandler from "../state/statehandler";
import { handleCardMasteryMessage } from "./cardmastery";
import { calculateUniqueCardCost } from "./helpers";
import MessageHandler, {
  TrophyMessage,
  DeckMessage,
  GenericMessage,
  SkillMessage,
  TournamentMessage,
  NotifierMessage,
} from "./messagehandler";
import { OfflineHandler } from "./offlinehandler";
import { PackData, PackManager, PackMessages } from "./packmanager";
import { TimerHandler } from "./timerhandler";
import { TournamentManager, TournamentMessages } from "./tournamentmanager";

export const offlineHandler = new OfflineHandler();
export default class GameLoop {
  private static instance: GameLoop;
  public stateHandler: StateHandler;
  public rulesHandler: RulesHandler;
  public tournamentManager: TournamentManager;

  public lastTickTime: number = 0;

  private packManager: PackManager;
  private lastTime: number;
  private lastTimerTick: number = 0;
  private tickCounter: number;

  private running: boolean = false;

  constructor() {
    MessageHandler.init();
    this.stateHandler = new StateHandler();
    this.rulesHandler = new RulesHandler();
    this.packManager = new PackManager(this.stateHandler, this.rulesHandler);
    this.tournamentManager = new TournamentManager(
      this.stateHandler,
      this.rulesHandler
    );
    this.lastTime = 0;
    this.tickCounter = this.rulesHandler.getRuleValue("TickLength");
  }

  static getInstance() {
    if (!this.instance) this.instance = new GameLoop();
    return this.instance;
  }

  start() {
    if (!this.running) {
      this.running = true;
      this.loop(0);
    }
  }

  stop() {
    this.running = false;
  }

  isRunning() {
    return this.running;
  }

  tick() {
    const state = this.stateHandler.getState();
    this.packManager.handleTick();
    this.tournamentManager.handleTick();
    if (state.skills.workSkill.acquired) {
      const skill = AllSkills.workSkill;

      state.entities.money.amount += skill.effect(state.skills.workSkill.level);
    }

    this.stateHandler.updateState(state);
  }

  loop(now: number) {
    // console.time("loop");
    if (now - this.lastTime > this.tickCounter) {
      this.stateHandler.savePersistant();
      const state = this.stateHandler.getState();
      this.stateHandler.saveStateHistory(this.stateHandler.gameState);
      this.tick();

      state.counters.time.amount = Date.now();
      this.lastTickTime = Date.now();

      this.stateHandler.updateState(state);
      this.lastTime = now;
    }

    const messages = MessageHandler.getandClearMessages();
    while (messages && messages.length > 0) {
      const m = messages.shift();

      if (!m) break;

      if (PackManager.messageList.includes(m.message as PackMessages)) {
        this.packManager.handleMessages(
          m.message as PackMessages,
          m.data as PackData
        );
      }

      if (
        TournamentManager.messageList.includes(m.message as TournamentMessages)
      ) {
        this.tournamentManager.handleMessages(
          m.message as TournamentMessages,
          m.data as TournamentMessage
        );
      }

      if (m.message === "unlockskill") {
        const data = m.data as SkillMessage;
        const state = this.stateHandler.getState();
        const rule = AllSkills[data.name].rule;

        if (state.entities.money.amount >= rule.requirement) {
          state.skills[data.name].acquired = true;
          state.routes.skillstab.notify = true;
          state.routes.skills.notify = true;
          state.entities.money.amount -= rule.requirement;
          this.stateHandler.updateState(state);
        } else {
          MessageHandler.sendClientMessage("Not enough money");
        }
      }

      if (m.message === "levelupskill") {
        const data = m.data as SkillMessage;
        const state = this.stateHandler.getState();
        const skill = AllSkills[data.name];

        const cost = skill.cost(state.skills[data.name].level);

        if (state.entities.money.amount >= cost) {
          state.skills[data.name].level += 1;
          state.entities.money.amount -= cost;
          this.stateHandler.updateState(state);
        } else {
          MessageHandler.sendClientMessage("Not enough money");
        }
      }

      if (m.message === "toggleskill") {
        const data = m.data as SkillMessage;
        const state = this.stateHandler.getState();
        state.skills[data.name].on = !state.skills[data.name].on;
        this.stateHandler.updateState(state);
      }

      if (m.message === "tradecard") {
        const data = m.data as GenericMessage;
        const state = this.stateHandler.getState();
        let fail = "";

        const [costBadCards, costGoodCards, costMetaCards] =
          calculateUniqueCardCost(data.id as number);

        if (state.entities.badcards.amount <= costBadCards)
          fail += "Not enough bad cards \n";
        if (state.entities.goodcards.amount <= costGoodCards)
          fail += "Not enough good cards \n";
        if (state.entities.metacards.amount <= costMetaCards)
          fail += "Not enough meta cards";

        if (!fail) {
          state.counters.uniquecards.amount++;
          state.entities.badcards.amount = Math.floor(
            state.entities.badcards.amount - costBadCards
          );
          state.entities.goodcards.amount = Math.floor(
            state.entities.goodcards.amount - costGoodCards
          );
          state.entities.metacards.amount = Math.floor(
            state.entities.metacards.amount - costMetaCards
          );
          this.stateHandler.updateState({});
        }
      }

      if (m.message === "addcardtodeck") {
        const data = m.data as DeckMessage;
        const state = this.stateHandler.getState();

        const index = `slot${data.slot}` as keyof typeof state.deck.cards;
        if (data.person === "me") {
          state.deck.cards[index] = data.id;
        } else {
          const person = state.team.find((p) => p.name === data.person);
          if (person) {
            person.deck[index] = data.id;
          }
        }
        this.stateHandler.updateState(state);
      }
      if (m.message === "addtrophy") {
        const data = m.data as TrophyMessage;
        const state = this.stateHandler.getState();
        const index = `slot${data.slot}` as keyof typeof state.trophycase;
        state.trophycase[index] = data.trophy;
        this.stateHandler.updateState(state);
      }

      if (m.message === "clearnotifier") {
        const data = m.data as NotifierMessage;
        const state = this.stateHandler.getState();
        state.routes[data.route].notify = false;
        this.stateHandler.updateState(state);
      }

      if (m.message === "clearmessages") {
        MessageHandler.sendClientMessage("", { clear: true });
      }

      const state = handleCardMasteryMessage(m, this.stateHandler.getState());
      if (state) this.stateHandler.updateState(state);
    }

    let state = this.stateHandler.getState();
    state = this.rulesHandler.checkActiveRules(state) as GameState;
    if (state) {
      this.stateHandler.updateState(state);
    }

    state = this.stateHandler.getState();
    // if (
    //   state.entities.badcards.amount === 0 &&
    //   state.entities.goodcards.amount === 0 &&
    //   state.entities.metacards.amount === 0 &&
    //   state.entities.money.amount < this.rulesHandler.getRuleValue("PackCost")
    // ) {
    //   MessageHandler.sendClientMessage(
    //     "Your aunt visits and gives you 50 money"
    //   );
    //   state.entities.money.amount += 50;
    //   state = this.stateHandler.updateState(state);
    // }

    if (now - this.lastTimerTick >= 1000) {
      TimerHandler.getInstance().run();
      this.lastTimerTick = now;
    }

    this.stateHandler.pushState();
    // console.timeEnd("loop");
    if (this.running) window.requestAnimationFrame(this.loop.bind(this));
  }
}
