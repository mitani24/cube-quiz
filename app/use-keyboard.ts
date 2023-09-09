import { useEffect } from "react";

export const useKeyboard = ({
  onKeyDown,
  onKeyUp,
}: {
  onKeyDown?: (e: KeyboardEvent) => void;
  onKeyUp?: (e: KeyboardEvent) => void;
}) => {
  useEffect(() => {
    if (onKeyDown) {
      window.addEventListener("keydown", onKeyDown);
    }
    if (onKeyUp) {
      window.addEventListener("keyup", onKeyUp);
    }
    return () => {
      if (onKeyDown) {
        window.removeEventListener("keydown", onKeyDown);
      }
      if (onKeyUp) {
        window.removeEventListener("keyup", onKeyUp);
      }
    };
  }, [onKeyDown, onKeyUp]);
};
