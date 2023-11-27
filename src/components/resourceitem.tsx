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
    if (changeAmount !== 0)
      change = <span className={`${color}`}>({changeAmount})</span>;
  }

  return (
    <div>
      <div>{name}</div>
      <span className="font-semibold">
        {fixDecimal ? resource.amount.toFixed(2) : resource.amount}
      </span>{" "}
      {change}
    </div>
  );
}
