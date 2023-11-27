import { Button } from "../../components/button";

interface BulkButtonProps {
  click: (e: React.MouseEvent<HTMLButtonElement>) => void;
  amount: number;
  action?: string;
}

export default function BulkButton({
  click,
  amount,
  action = "Sell",
}: BulkButtonProps) {
  return (
    <Button action={action} width="auto" onClick={click}>
      x{amount}
    </Button>
  );
}
