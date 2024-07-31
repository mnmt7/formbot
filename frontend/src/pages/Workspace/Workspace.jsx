import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { logoutAsync, selectAuthUser } from "../../store/auth-slice";
import deleteIcon from "../../assets/delete.svg";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import CreateFolderModal from "../../components/CreateFolderModal/CreateFolderModal";
import classes from "./Workspace.module.css";
import { fetchFolderAsync, selectFolder } from "../../store/folder-slice";
import downIcon from "../../assets/down.svg";

export default function Workspace() {
  const user = useSelector(selectAuthUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [openDropdown, setOpenDropdown] = useState(false);

  const folder = useSelector(selectFolder);
  const folders = folder ? folder.folders : [];
  const formbots = folder ? folder.formbots : [];

  const [currentFolder, setCurrentFolder] = useState(user.rootFolder);

  const [selectedItem, setSelectedItem] = useState(null);

  const createModalRef = useRef();
  const deleteModalRef = useRef();

  useEffect(() => {
    dispatch(fetchFolderAsync(currentFolder));
  }, [dispatch, currentFolder]);

  return (
    <div className={classes.workspace}>
      <CreateFolderModal parent={currentFolder} ref={createModalRef} />
      {selectedItem && (
        <DeleteModal ref={deleteModalRef} selectedItem={selectedItem} />
      )}
      <div className={classes.header}>
        <div className={classes.select} onClick={() => setOpenDropdown(true)}>
          {`${user.username}'s workspace`} <img src={downIcon} alt="" />
          {openDropdown && (
            <div className={classes.dropdowns}>
              <div
                className={classes.settings}
                onClick={() => {
                  navigate("/settings");
                  setOpenDropdown(false);
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
          {folders.map((folder) => (
            <li key={folder._id}>
              <button className={classes.folder}>
                <span onClick={() => setCurrentFolder(folder._id)}>
                  {folder.name}
                </span>
                <img
                  src={deleteIcon}
                  alt="Delete Icon"
                  className={classes.deleteIcon}
                  onClick={() => {
                    setSelectedItem({ type: "folder", id: folder._id });
                    deleteModalRef.current?.open();
                  }}
                />
              </button>
            </li>
          ))}
        </ul>
        <ul className={classes.formbots}>
          <li>
            <button
              className={classes.newFormbot}
              onClick={() => navigate(`/formbot/new?folder=${currentFolder}`)}
            >
              <PlusIcon className={classes.plusIcon} />
              <span>Create a formbot</span>
            </button>
          </li>
          {formbots.map((formbot) => (
            <li className={classes.formbotContainer} key={formbot._id}>
              <Link to={`/formbot/${formbot._id}`} className={classes.formbot}>
                {formbot.name}
              </Link>
              <img
                src={deleteIcon}
                alt="Delete Icon"
                className={classes.deleteFormbotIcon}
                onClick={() => {
                  setSelectedItem({ type: "formbot", id: formbot._id });
                  deleteModalRef.current?.open();
                }}
              />
            </li>
          ))}
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
