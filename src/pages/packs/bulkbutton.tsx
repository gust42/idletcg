import { Button } from "../../components/button";

interface BulkButtonProps {
  click: (e: React.MouseEvent<HTMLButtonElement>) => void;
  amount: number;
}

export default function BulkButton({ click, amount }: BulkButtonProps) {
  return (
    <Button width="auto" onClick={click}>
      x{amount}
    </Button>
  );
}
