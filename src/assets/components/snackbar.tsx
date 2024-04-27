import { useState } from "react";

interface SnackbarProps {
  message: string;
  type: "success" | "error" | null;
  onClose: () => void;
}

const Snackbar: React.FC<SnackbarProps> = ({ message, type, onClose }) => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    onClose();
  };

  return (
    <div
      className={` w-max m-auto rounded fixed top-5 left-90 right-5 z-50 py-4 px-6 text-white ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      } ${
        show
          ? "opacity-100"
          : "opacity-0 pointer-events-none transition-opacity duration-300"
      }`}
    >
      <div className="container mx-auto">{message} </div>
      <button
        className="absolute top-0 bottom-0 right-0 left-100 ml-2 px-1.5 py-1.5"
        onClick={handleClose}
      >
        &#10005;
      </button>
    </div>
  );
};

export default Snackbar;
