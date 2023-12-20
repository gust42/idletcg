import { PropsWithChildren } from "react";

interface IModalProps {
  open: boolean;
  onClose: () => void;
}

export const Modal = ({
  open,
  children,
  onClose,
}: PropsWithChildren<IModalProps>) => {
  if (!open) return null;
  return (
    <>
      <div className="absolute p-4 z-10 bg-white top-4 left-0 right-0 md:top-[100px] md:left-[200px] md:right-[100px] overflow-y-auto max-h-[80vh] rounded shadow-md   ">
        {children}
      </div>
      <div
        onClick={() => onClose()}
        className="fixed top-0 left-0 w-screen h-screen bg-black opacity-50 z-0"
      />
    </>
  );
};
