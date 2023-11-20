interface IResourceItemProps {
  resource: {
    acquired: boolean;
    amount: number;
  };
  name: string;
  fixDecimal?: boolean;
}

export default function ResourceItem(props: IResourceItemProps) {
  if (!props.resource.acquired) return null;
  return (
    <div className="resource">
      {props.name}:{" "}
      {props.fixDecimal
        ? props.resource.amount.toFixed(2)
        : props.resource.amount}
    </div>
  );
}
