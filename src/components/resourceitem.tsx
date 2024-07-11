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
  if (!resource.acquired) return null;

  let change = <></>;

  if (oldValue) {
    // get average change the last 3 ticks that had a change
    const changeValue = resource.amount - oldValue;
    if (changeValue !== 0) {
      change = <Change change={resource.amount - oldValue} />;
    }
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
