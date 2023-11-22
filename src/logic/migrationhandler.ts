import { GameState } from "../interfaces/logic";
import { GameStateV2, migrateV2 } from "../migrations/v2";
import { migrateV3 } from "../migrations/v3";

export class MigrationHandler {
  private dataVersion: number = 1;
  private migrations: {
    [key: number]: (state: never) => GameState | GameStateV2;
  } = {
    2: migrateV2,
    3: migrateV3,
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
