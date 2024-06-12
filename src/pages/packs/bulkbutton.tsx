import { Button } from "../../components/button";

interface BulkButtonProps {
  click: (e: React.MouseEvent<HTMLDivElement>) => void;
  amount: number;
  action?: string;
  disabled?: boolean;
}

export default function BulkButton({
  click,
  amount,
  disabled = false,
}: BulkButtonProps) {
  return (
    <Button
      disabled={disabled}
      width={"33%"}
      action=""
      onClick={click}
      repeatable
    >
      {amount === -1 ? "All" : `x${amount}`}
    </Button>
  );
}
