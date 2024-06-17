import { GameState } from "../interfaces/logic";
import RulesHandler, { AllSkills } from "../rules/ruleshandler";
import StateHandler from "../state/statehandler";
import { handleCardMasteryMessage } from "./cardmastery";
import {
  handleChampionBattleMessage,
  handleChampionBattleTick,
} from "./championbattle";
import MessageHandler, {
  BuyTrophyMessage,
  ChampionBattleMessage,
  DeckMessage,
  Message,
  NotifierMessage,
  SkillMessage,
  TournamentMessage,
  TrophyMessage,
} from "./messagehandler";
import { OfflineHandler } from "./offlinehandler";
import { PackData, PackManager, PackMessages } from "./packmanager";
import { TimerHandler } from "./timerhandler";
import { TournamentManager, TournamentMessages } from "./tournamentmanager";
import { handleUniqueCardMessage } from "./uniquecardhandler";

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
    this.packManager.handleTick();
    this.tournamentManager.handleTick();

    handleChampionBattleTick();

    const state = this.stateHandler.getState();
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
          if (
            !skill.rule.maxLevel ||
            state.skills[data.name].level + 1 <= skill.rule.maxLevel
          ) {
            state.skills[data.name].level += 1;
            state.entities.money.amount -= cost;
            this.stateHandler.updateState(state);
          }
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

      if (m.message === "buytrophy") {
        const data = m.data as BuyTrophyMessage;
        const state = this.stateHandler.getState();
        const rule = this.rulesHandler.getRuleValue("TrophyCost");

        const teammember = state.team.find((p) => p.name === data.teamMember)!;
        if (
          state.entities.money.amount >= rule * data.amount &&
          teammember.trophies >= data.amount
        ) {
          state.entities.money.amount -= rule * data.amount;
          teammember.trophies -= data.amount;
          state.entities.trophies.amount += data.amount;
          this.stateHandler.updateState(state);
        } else {
          MessageHandler.sendClientMessage("Not enough money");
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

      if (m.message === "addcardtochampiondeck") {
        const data = m.data as DeckMessage;
        const state = this.stateHandler.getState();

        const index =
          `slot${data.slot}` as keyof typeof state.deck.championDeck;
        state.deck.championDeck[index] = data.id;
        this.stateHandler.updateState(state);
      }

      if (m.message === "addtrophy") {
        const data = m.data as TrophyMessage;
        const state = this.stateHandler.getState();
        state.trophycase[data.trophy] = true;

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
      {
        const state = handleChampionBattleMessage(
          m as Message<ChampionBattleMessage>,
          this.stateHandler.getState()
        );

        if (state) this.stateHandler.updateState(state);
      }

      {
        const state = handleCardMasteryMessage(m, this.stateHandler.getState());

        if (state) this.stateHandler.updateState(state);
      }
      {
        const state = handleUniqueCardMessage(m, this.stateHandler.getState());

        if (state) this.stateHandler.updateState(state);
      }
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
