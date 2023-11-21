import { Button } from "../../components/button";

interface BulkButtonProps {
  click: (e: React.MouseEvent<HTMLDivElement>) => void;
  amount: number;
}

export default function BulkButton({ click, amount }: BulkButtonProps) {
  return <Button onClick={click}>x{amount}</Button>;
}
