"use client";
import { useState } from "react";
interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
}: ConfirmModalProps) {
  const handleCancelClick = () => {
    setMoveUp(true);
    setTimeout(() => {
      onCancel();
    }, 200);
    setTimeout(() => {
      setMoveUp(false);
    }, 500);
  }
  const handleConfirmClick = () => {
    setMoveUp(true);
    setTimeout(() => {
      onConfirm();
    }, 200);
    setTimeout(() => {
      setMoveUp(false);
    }, 500);
  }
  const [moveUp, setMoveUp] = useState(false);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-black/50 transition-opacity" 
        onClick={onCancel}
      />
      
      {/* Modal Container */}
      <div className={`relative w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-zinc-900
        ${moveUp ? "animate-out" : "animate-in"}`}>
        {/* <h3 className="text-lg font-medium leading-6 text-zinc-900 dark:text-zinc-50">
          {title}
        </h3> */}
        <div className="mt-2">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {message}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            onClick={handleCancelClick}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none"
            onClick={handleConfirmClick}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
