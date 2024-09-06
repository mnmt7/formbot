import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

import classes from "./DeleteModal.module.css";

const DeleteModal = forwardRef(function DeleteModal({ title, onDelete }, ref) {
  useImperativeHandle(ref, () => ({
    open() {
      dialogRef.current.showModal();
    },
  }));

  const dialogRef = useRef();

  const closeModal = () => dialogRef.current.close();

  return createPortal(
    <dialog ref={dialogRef} className={classes.dialog} onClick={closeModal}>
      <div
        onClick={(event) => event.stopPropagation()}
        className={classes.container}
      >
        <p className={classes.title}>{title}</p>
        <div className={classes.btns}>
          <button
            onClick={() => {
              onDelete();
              closeModal();
            }}
            className={`${classes.btn} ${classes.confirmBtn}`}
          >
            Confirm
          </button>
          <button className={classes.btn} onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </dialog>,
    document.getElementById("modal")
  );
});

export default DeleteModal;
