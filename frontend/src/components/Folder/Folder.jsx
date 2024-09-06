import deleteIcon from "../../assets/delete.svg";
import classes from "./Folder.module.css";

export default function Folder({
  folder,
  currentFolder,
  onFolderClick,
  onFolderDelete,
}) {
  return (
    <li
      className={`${classes.folder} ${
        currentFolder === folder._id ? classes.activeFolder : ""
      }`}
    >
      <button className={classes.folderBtn} onClick={onFolderClick}>
        {folder.name}
      </button>
      <button className={classes.deleteBtn}>
        <img
          src={deleteIcon}
          alt="Delete Icon"
          className={classes.deleteIcon}
          onClick={onFolderDelete}
        />
      </button>
    </li>
  );
}
