import React, { useEffect } from "react";
import "./Modal.css";

function Modal({ isOpen, onClose, onYes, children }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
        <div className="modal-buttons">
          <button onClick={onYes} className="modal-button yes">
            Yes
          </button>
          <button onClick={onClose} className="modal-button close">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
