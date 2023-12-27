import { getCardSize } from "../logic/helpers";

interface ITrophyProps{
    trophy: string | undefined;
    size?: "small" | "medium" | "large";
}
export const Trophy = ({trophy: id, size = "medium"}: ITrophyProps) => {
    const trophy = id;
    const [pxs, pic] = getCardSize(size);
        return (
            <div className={`${pxs} bg-[#faefdc]  rounded-3xl text-center  p-1 select-none`}>
                <div className=" bg-[#F2E8D7] h-full rounded-3xl  flex flex-col ">
                    {!trophy ? ("") : (
                        <>
                            <div className={`${pic} flex-grow flex justify-center items-center`}>
                                {trophy}
                            </div>
                        </>
                    )}
                </div>
            </div>
        )
    }
