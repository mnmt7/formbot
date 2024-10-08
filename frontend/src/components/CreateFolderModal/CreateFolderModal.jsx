import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";

import classes from "./CreateFolderModal.module.css";
import Input from "../Input/Input";
import { createFolderAsync } from "../../store/folder-slice";
import { toast } from "react-toastify";

const CreateModal = forwardRef(function CreateModal({ parent }, ref) {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
    setNameError(false);
  };

  useImperativeHandle(ref, () => ({
    open() {
      dialogRef.current.showModal();
    },
  }));

  const closeModal = () => {
    setName("");
    dialogRef.current.close();
  };

  const dispatch = useDispatch();

  const handleCreateFolder = async () => {
    if (name.length === 0) {
      setNameError(true);
      return;
    }

    toast.promise(dispatch(createFolderAsync({ name, parent })).unwrap(), {
      pending: "Creating folder...",
      success: "Folder created",
      error: "Folder creation failed",
    });
    closeModal();
  };

  const dialogRef = useRef();
  return createPortal(
    <dialog ref={dialogRef} className={classes.dialog} onClick={closeModal}>
      <div
        onClick={(event) => event.stopPropagation()}
        className={classes.container}
      >
        <p className={classes.title}>Create New Folder</p>
        <Input
          id="folderName"
          placeholder="Enter a folder name"
          errorText={nameError && "Required field"}
          value={name}
          onChange={handleNameChange}
        />

        <div className={classes.btns}>
          <button
            onClick={handleCreateFolder}
            className={`${classes.btn} ${classes.confirmBtn}`}
          >
            Done
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

export default CreateModal;
