interface BulkButtonProps {
  click: (e: React.MouseEvent<HTMLDivElement>) => void;
  amount: number;
}

export default function BulkButton({ click, amount }: BulkButtonProps) {
  return (
    <div
      className="p-2 mr-3 text-white bg-button  hover:bg-button-hover w-auto rounded text-center cursor-pointer"
      onClick={click}
    >
      x{amount}
    </div>
  );
}
