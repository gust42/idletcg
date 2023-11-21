import { GameState, GameStateV1 } from "../interfaces/logic";

const migrateV2 = (currentState: GameStateV1) => {
  const newState: GameState = {
    skills: {
      autopackskill: {
        acquired: currentState.autopackskill.acquired,
        level: 1,
      },
      workskill: {
        acquired: currentState.workskill.acquired,
        level: 1,
      },
      shopkeeperfriendskill: {
        acquired: false,
        level: 1,
      },
    },
    tabs: {
      packstab: {
        acquired: currentState.packstab.acquired,
      },
      skillstab: {
        acquired: currentState.skillstab.acquired,
      },
      tradebindertab: {
        acquired: currentState.tradebindertab.acquired,
      },
      tournamentstab: {
        acquired: currentState.tournamentstab.acquired,
      },
    },
    entities: {
      badcards: {
        amount: currentState.badcards.amount,
        acquired: currentState.badcards.acquired,
      },
      goodcards: {
        amount: currentState.goodcards.amount,
        acquired: currentState.goodcards.acquired,
      },
      metacards: {
        amount: currentState.metacards.amount,
        acquired: currentState.metacards.acquired,
      },
      money: {
        amount: currentState.money.amount,
        acquired: currentState.money.acquired,
      },
    },
    counters: {
      uniquecards: {
        amount: currentState.uniquecards.amount,
      },
    },
  };

  console.log("migrating to v2");
  return newState;
};

export class MigrationHandler {
  private dataVersion: number = 1;
  private migrations: { [key: number]: (state: never) => GameState } = {
    2: migrateV2,
  };

  constructor() {
    this.loadDataVersion();
  }

  public migrate(state: never): GameState {
    let migratedState = state;
    Object.keys(this.migrations).forEach((key) => {
      const version = parseInt(key);
      if (version > this.dataVersion) {
        migratedState = this.migrations[version](migratedState) as never;
        this.dataVersion = version;
        this.saveDataVersion();
      }
    });

    return migratedState as GameState;
  }

  private loadDataVersion() {
    const dataVersion = localStorage.getItem("dataVersion");
    if (dataVersion) {
      this.dataVersion = parseInt(dataVersion);
    }
  }

  private saveDataVersion() {
    localStorage.setItem("dataVersion", this.dataVersion.toString());
  }
}
