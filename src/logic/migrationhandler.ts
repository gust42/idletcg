import { GameState, JoinedTeamMember } from "../interfaces/logic";
export class MigrationHandler {
  private dataVersion: number = 2;
  private storageVersionUndefined: boolean = false;

  private migrations: {
    [key: number]: (state: never) => GameState;
  } = {};

  constructor() {
    this.loadDataVersion();
    this.migrations = {
      2: this.v2Migration,
    };
  }

  public migrate(state: never): GameState {
    let migratedState = state;
    if (this.storageVersionUndefined) {
      this.dataVersion = 1;
    }
    Object.keys(this.migrations).forEach((key) => {
      const version = parseInt(key);
      if (version > this.dataVersion) {
        migratedState = this.migrations[version](migratedState) as never;
        this.dataVersion = version;
      }
    });

    this.saveDataVersion();

    return state;
  }

  private loadDataVersion() {
    const dataVersion = localStorage.getItem("dataVersion");
    if (dataVersion) {
      this.dataVersion = parseInt(dataVersion);
    } else {
      this.storageVersionUndefined = true;
    }
  }

  private saveDataVersion() {
    localStorage.setItem("dataVersion", this.dataVersion.toString());
  }

  private v2Migration(state: { team: JoinedTeamMember[] }): GameState {
    if (state.team.length > 0) {
      state.team = state.team.forEach((member) => {
        return {
          name: member.name,
          deck: {
            slot1: undefined,
            slot2: undefined,
            slot3: undefined,
          },
          rating: member.rating,
        };
      }) as unknown as JoinedTeamMember[];
    }
    return state as unknown as GameState;
  }
}
