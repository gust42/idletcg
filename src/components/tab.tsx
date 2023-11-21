interface ITabProps {
  item: {
    acquired: boolean;
  };
  active: boolean;
  onClick: () => void;
  name: string;
}

export default function Tab(props: ITabProps) {
  if (!props.item.acquired) return null;
  return (
    <div
      className={"tab " + (props.active ? "active" : "")}
      onClick={props.onClick}
    >
      {props.name}
    </div>
  );
}
