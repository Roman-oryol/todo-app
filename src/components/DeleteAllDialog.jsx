import { useEffect, useRef } from "react";

const DeleteAllDialog = ({ isOpen, onConfirm, onCancel }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target)) {
        onCancel();
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") onCancel();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      ref={dialogRef}
      className="absolute top-full right-0 z-10 mt-2 w-56 rounded-lg border border-zinc-700 bg-zinc-800 p-3 shadow-lg"
    >
      <p className="text-sm text-zinc-300">
        Удалить все задачи? Это действие нельзя отменить.
      </p>
      <div className="mt-3 flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="cursor-pointer rounded-md px-3 py-1.5 text-sm text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-zinc-200"
        >
          Отмена
        </button>
        <button
          onClick={onConfirm}
          className="cursor-pointer rounded-md bg-rose-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-rose-500 active:bg-rose-700"
        >
          Удалить
        </button>
      </div>
    </div>
  );
};

export default DeleteAllDialog;
