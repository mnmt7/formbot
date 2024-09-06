import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import { logoutAsync, selectAuthUser } from "../../store/auth-slice";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import CreateFolderModal from "../../components/CreateFolderModal/CreateFolderModal";
import classes from "./Workspace.module.css";
import {
  fetchFolderAsync,
  selectFolder,
  selectFolderStatus,
  deleteFolderAsync,
  deleteFormbotAsync,
} from "../../store/folder-slice";
import downIcon from "../../assets/down.svg";
import Folder from "../../components/Folder/Folder";
import Formbot from "../../components/Formbot/Formbot";
import Skeleton from "../../components/Skeleton/Skeleton";
import { loaderActions } from "../../store/loader-slice";

export default function Workspace() {
  const user = useSelector(selectAuthUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [openDropdown, setOpenDropdown] = useState(false);

  const folder = useSelector(selectFolder);
  const folders = folder?.folders ? folder.folders : [];
  const formbots = folder ? folder.formbots : [];

  const folderStatus = useSelector(selectFolderStatus);

  const [currentFolder, setCurrentFolder] = useState(user.rootFolder);

  const [selectedItem, setSelectedItem] = useState(null);

  const createModalRef = useRef();
  const deleteModalRef = useRef();
  const dropdownRef = useRef();

  useEffect(() => {
    // if (folderStatus === "idle") {
    dispatch(fetchFolderAsync(currentFolder));
    // }
  }, [
    dispatch,
    //  folderStatus,
    currentFolder,
  ]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpenDropdown(false);
    }
  };

  const handleEscKey = (event) => {
    if (event.key === "Escape") {
      setOpenDropdown(false);
    }
  };

  const handleFolderClick = (folder) => {
    console.log(currentFolder, folder._id);
    if (currentFolder != folder._id) {
      setCurrentFolder(folder._id);
    } else {
      setCurrentFolder(user.rootFolder);
    }
  };

  const handleFolderDelete = (folder) => {
    setSelectedItem({ type: "folder", id: folder._id });
    deleteModalRef.current?.open();
  };

  const handleFormbotDelete = (formbot) => {
    setSelectedItem({ type: "formbot", id: formbot._id });
    deleteModalRef.current?.open();
  };

  const handleDelete = () => {
    let deletePromise;
    if (selectedItem.type === "folder") {
      deletePromise = dispatch(deleteFolderAsync(selectedItem.id)).unwrap();
    } else if (selectedItem.type === "formbot") {
      deletePromise = dispatch(deleteFormbotAsync(selectedItem.id)).unwrap();
    }

    toast.promise(deletePromise, {
      pending: `Deleting ${selectedItem.type}...`,
      success: `Deleted ${selectedItem.type} successfully`,
      error: "Deletion failed",
    });
  };

  return (
    <div className={classes.workspace}>
      <CreateFolderModal parent={user.rootFolder} ref={createModalRef} />
      <DeleteModal
        ref={deleteModalRef}
        title={`Are you sure you want to 
          delete this ${selectedItem?.type}?`}
        onDelete={handleDelete}
      />

      <div className={classes.header}>
        <div
          className={classes.select}
          onClick={() =>
            setOpenDropdown((prevOpenDropdown) => !prevOpenDropdown)
          }
          ref={dropdownRef}
        >
          {`${user.username}'s workspace`} <img src={downIcon} alt="" />
          {openDropdown && (
            <div className={classes.dropdowns}>
              <div
                className={classes.settings}
                onClick={() => {
                  navigate("/settings");
                  setOpenDropdown(false);
                  dispatch(loaderActions.showLoader());
                }}
              >
                Settings
              </div>
              <div
                className={classes.logout}
                onClick={() => dispatch(logoutAsync())}
              >
                Log Out
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={classes.main}>
        <ul className={classes.folderBtns}>
          <li>
            <button
              className={classes.folder}
              onClick={() => createModalRef.current?.open()}
            >
              <NewFolderIcon className={classes.newFolderIcon} />
              <span>Create a folder</span>
            </button>
          </li>
          {folderStatus === "loading" ? (
            <Skeleton count={6} width={100} />
          ) : (
            folders.map((folder) => (
              <Folder
                key={folder._id}
                folder={folder}
                currentFolder={currentFolder}
                onFolderClick={() => handleFolderClick(folder)}
                onFolderDelete={() => handleFolderDelete(folder)}
              />
            ))
          )}
        </ul>
        <ul className={classes.formbots}>
          <li>
            <button
              className={classes.newFormbot}
              onClick={() => navigate(`/formbots/new?folder=${currentFolder}`)}
            >
              <PlusIcon className={classes.plusIcon} />
              <span>Create a formbot</span>
            </button>
          </li>
          {folderStatus === "loading" ? (
            <Skeleton width={180} height={210} count={11} />
          ) : (
            formbots.map((formbot) => (
              <Formbot
                key={formbot._id}
                formbot={formbot}
                onFormbotDelete={() => handleFormbotDelete(formbot)}
              />
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

function NewFolderIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
      />
    </svg>
  );
}

function PlusIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  );
}
