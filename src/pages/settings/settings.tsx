import { Button } from "../../components/button";
import { Title } from "../../components/typography";
import GameLoop from "../../logic/gameloop";

export const Settings = () => {
  return (
    <div>
      <Title>Settings</Title>
      <div className="flex flex-col gap-4">
        <Button
          action="BACKUP"
          onClick={() => {
            const data = localStorage.getItem("idletcg.state");
            if (data) {
              navigator.clipboard.writeText(btoa(data));
            }
          }}
        >
          Save data to clipboard
        </Button>
        <Button
          action="RESTORE"
          onClick={async () => {
            const data = prompt("Paste data here");
            const parsedData = data ? atob(data) : null;
            if (parsedData) {
              GameLoop.getInstance().stop();
              setTimeout(() => {
                localStorage.setItem("idletcg.state", parsedData);
                window.location.reload();
              }, 100);
            }
          }}
        >
          Restore data from clipboard
        </Button>
        <Button
          action="RESET"
          onClick={() => {
            GameLoop.getInstance().stop();
            setTimeout(() => {
              localStorage.clear();
              window.location.reload();
            }, 100);
          }}
        >
          Clear data
        </Button>
      </div>
      <div className="text-lg mt-4">
        Check out my other games (desktop):
        <div>
          <a href="https://www.dragonhunt.net" target="_blank">
            Dragonhunt
          </a>
        </div>
        <div>
          <a href="https://landofblood.firebaseapp.com" target="_blank">
            Land of blood
          </a>
        </div>
      </div>
    </div>
  );
};
