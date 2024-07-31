import { forwardRef, useImperativeHandle, useRef } from "react";

import classes from "./DeleteModal.module.css";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { deleteFolderAsync, deleteFormbotAsync } from "../store/folder-slice";

const DeleteModal = forwardRef(function DeleteModal({ selectedItem }, ref) {
  useImperativeHandle(ref, () => ({
    open() {
      dialogRef.current.showModal();
    },
  }));

  const dialogRef = useRef();

  const title = `Are you sure you want to 
delete this ${selectedItem.type} ?`;

  const closeModal = () => dialogRef.current.close();

  const dispatch = useDispatch();

  const handleDelete = () => {
    if (selectedItem.type === "folder") {
      dispatch(deleteFolderAsync(selectedItem.id));
    } else if (selectedItem.type === "formbot") {
      dispatch(deleteFormbotAsync(selectedItem.id));
    }

    closeModal();
  };

  return createPortal(
    <dialog ref={dialogRef} className={classes.dialog} onClick={closeModal}>
      <div
        onClick={(event) => event.stopPropagation()}
        className={classes.container}
      >
        <p className={classes.title}>{title}</p>
        <div className={classes.btns}>
          <button
            onClick={handleDelete}
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
