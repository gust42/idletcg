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
      {Math.abs(Math.round(change * 100) / 100)}
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
    const changeAmount = resource.amount - oldValue;

    if (changeAmount !== 0) change = <Change change={changeAmount} />;
  }

  return (
    <div>
      <div>
        {name} {change}
      </div>
      <span className="font-semibold">
        {fixDecimal ? format(resource.amount, 2) : format(resource.amount, 0)}
      </span>
    </div>
  );
}
