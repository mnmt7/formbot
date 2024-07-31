import { useDispatch, useSelector } from "react-redux";
import { logoutAsync, selectAuthUser } from "../store/auth-slice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { fetchFolder } from "../api/folder";
import deleteIcon from "../assets/delete.svg";
import DeleteModal from "../components/DeleteModal";
import CreateFolderModal from "../components/CreateFolderModal";
import classes from "./Workspace.module.css";
import { fetchFolderAsync, selectFolder } from "../store/folder-slice";

export default function Workspace() {
  const user = useSelector(selectAuthUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const folder = useSelector(selectFolder);
  const folders = folder ? folder.folders : [];
  const formbots = folder ? folder.formbots : [];

  const [currentFolder, setCurrentFolder] = useState(user.rootFolder);
  // const [folders, setFolders] = useState([]);
  // const [formbots, setFormbots] = useState([]);

  const [selectedItem, setSelectedItem] = useState(null);

  const createModalRef = useRef();
  const deleteModalRef = useRef();

  // useEffect(() => {
  //   (async () => {
  //     const response = await fetchFolder(currentFolder);
  //     setFolders(response.data.data.folders);
  //     setFormbots(response.data.data.formbots);
  //   })();
  // }, [currentFolder]);

  useEffect(() => {
    dispatch(fetchFolderAsync(currentFolder));
  }, [dispatch, currentFolder]);

  const handleDeleteFolder = () => {
    // todo
  };

  const handleDeleteFormbot = () => {
    // todo
  };

  return (
    <div className={classes.workspace}>
      <CreateFolderModal parent={currentFolder} ref={createModalRef} />
      {selectedItem && (
        <DeleteModal ref={deleteModalRef} selectedItem={selectedItem} />
      )}
      <div className={classes.header}>
        <select name="" id="" className={classes.select}>
          <option value="">{`${user.username}'s workspace`}</option>
          <option value="" onClick={() => navigate("/settings")}>
            Settings
          </option>
          <option value="" onClick={() => dispatch(logoutAsync())}>
            logout
          </option>
        </select>
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
                {/* <DeleteIcon
                  className={classes.deleteIcon}
                  onClick={handleDeleteFolder}
                /> */}
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

function DeleteIcon({ className }) {
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
        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
      />
    </svg>
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
