import React from "react";
import "./Modal.css";

function Modal({ open, children, disableClose, onClose, loginForm }) {
  function handleClose(e) {
    if (!disableClose) {
      onClose();
    }
  }

  if (open) {
    return (
      <div className="modal">
        <div className="modal__blocker" onClick={handleClose}></div>
        <div className={`modal__body ${loginForm && "loginForm"}`}>
          {children}
          {!disableClose && (
            <div className="modal__close" onClick={handleClose}></div>
          )}
        </div>
      </div>
    );
  } else return null;
}

export default Modal;
