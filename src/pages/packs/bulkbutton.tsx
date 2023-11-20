interface BulkButtonProps {
  click: (e: React.MouseEvent<HTMLDivElement>) => void;
  amount: number;
}

export default function BulkButton({ click, amount }: BulkButtonProps) {
  return (
    <div className="button bulk-button" onClick={click}>
      x{amount}
    </div>
  );
}
