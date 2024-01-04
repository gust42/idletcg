import { getCardSize } from "../logic/helpers";
import { AllTournaments } from "../rules/ruleshandler";
import { Tournaments } from "../rules/tournaments/tournament";

interface ITrophyProps {
  trophy: keyof Tournaments | undefined;
  size?: "small" | "medium" | "large";
}
export const Trophy = ({ trophy: id, size = "medium" }: ITrophyProps) => {
  const trophy = id ? AllTournaments[id] : "";
  const [pxs] = getCardSize(size);
  return (
    <div
      className={`${pxs} bg-stone-300  rounded text-center  p-1 select-none`}
    >
      <div className=" bg-stone-200 h-full rounded  flex flex-col ">
        {!trophy ? (
          ""
        ) : (
          <>
            <div className={`flex-grow flex justify-center items-center`}>
              {trophy.name}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
