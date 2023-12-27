import { Button } from "../../components/button";

interface BulkButtonProps {
  click: (e: React.MouseEvent<HTMLDivElement>) => void;
  amount: number;
  action?: string;
}

export default function BulkButton({
  click,
  amount,
  action = "Sell",
}: BulkButtonProps) {
  return (
    <Button width={"33%"} action={action} onClick={click}>
      {amount === -1 ? "All" : `x${amount}`}
    </Button>
  );
}
