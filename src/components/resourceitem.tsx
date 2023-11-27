interface IResourceItemProps {
  resource: {
    acquired: boolean;
    amount: number;
  };
  name: string;
  fixDecimal?: boolean;
  oldValue: number;
}

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
    const color = changeAmount > 0 ? "text-green-600" : "text-red-600";
    const arrow = changeAmount > 0 ? "&uarr;" : "&darr;";

    if (changeAmount !== 0)
      change = (
        <span className={`${color}`}>
          <span dangerouslySetInnerHTML={{ __html: arrow }} />
          {Math.abs(Math.round(changeAmount * 100) / 100)}
        </span>
      );
  }

  return (
    <div>
      <div>
        {name} {change}
      </div>
      <span className="font-semibold">
        {fixDecimal ? resource.amount.toFixed(2) : resource.amount}
      </span>
    </div>
  );
}
