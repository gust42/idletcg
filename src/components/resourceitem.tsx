import { useRef } from "react";
import { format } from "./../helpers/number";
interface IResourceItemProps {
  resource: {
    acquired: boolean;
    amount: number;
  };
  name: string;
  fixDecimal?: boolean;
  oldValue: number;
}

export const Change = ({ change }: { change: number }) => {
  const color = change > 0 ? "text-green-600" : "text-red-600";
  const arrow = change > 0 ? "&uArr;" : "&dArr;";
  return (
    <span className={`${color}`}>
      <span dangerouslySetInnerHTML={{ __html: arrow }} />
      {format(Math.abs(Math.round(change * 100) / 100))}
    </span>
  );
};

export default function ResourceItem({
  name,
  resource,
  fixDecimal,
  oldValue,
}: IResourceItemProps) {
  const changeHistory = useRef<number[]>([]);
  if (!resource.acquired) return null;

  let change = <></>;

  if (oldValue) {
    changeHistory.current.push(resource.amount - oldValue);

    if (changeHistory.current.length > 10) changeHistory.current.shift();

    // get average change the last 3 ticks that had a change
    const changeAverage =
      changeHistory.current.length === 0
        ? 0
        : changeHistory.current.reduce((acc, change) => acc + change, 0) /
          changeHistory.current.length;

    if (changeAverage !== 0) change = <Change change={changeAverage} />;
  }

  return (
    <div>
      <div>{name}</div>
      <span className="font-semibold">
        {fixDecimal ? format(resource.amount, 2) : format(resource.amount, 0)}{" "}
        {change}
      </span>
    </div>
  );
}
