import { GameState } from "../interfaces/logic";
export class MigrationHandler {
  // private dataVersion: number = 1;
  // private migrations: {
  //   [key: number]: (state: never) => GameState | GameStateV2;
  // } = {
  //   2: migrateV2,
  //   3: migrateV3,
  //   4: migrateV4,
  // };

  constructor() {
    // this.loadDataVersion();
  }

  public migrate(state: GameState): GameState {
    // Object.keys(this.migrations).forEach((key) => {
    //   const version = parseInt(key);
    //   if (version > this.dataVersion) {
    //     migratedState = this.migrations[version](migratedState) as never;
    //     this.dataVersion = version;
    //     this.saveDataVersion();
    //   }
    // });

    console.log(state);
    if (!state.counters.time) {
      state.counters.time = {
        amount: Date.now(),
      };
    }

    if (!state.entities.rating) {
      state.entities.rating = {
        amount: 0,
        acquired: false,
      };
    }

    return state;
  }

  // private loadDataVersion() {
  //   const dataVersion = localStorage.getItem("dataVersion");
  //   if (dataVersion) {
  //     this.dataVersion = parseInt(dataVersion);
  //   }
  // }

  // private saveDataVersion() {
  //   localStorage.setItem("dataVersion", this.dataVersion.toString());
  // }
}
