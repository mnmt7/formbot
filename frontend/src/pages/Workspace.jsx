import { useDispatch, useSelector } from "react-redux";
import { logoutAsync, selectAuthUser } from "../store/auth-slice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchFolder } from "../api/folder";

export default function Workspace() {
  const user = useSelector(selectAuthUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [folders, setFolders] = useState([]);
  const [formbots, setFormbots] = useState([]);

  useEffect(() => {
    handleFolderChange(user.rootFolder);
  }, [user]);

  const handleFolderChange = async (folderId) => {
    const response = await fetchFolder(folderId);
    setFolders(response.data.data.folders);
    setFormbots(response.data.data.formbots);
  };

  return (
    <>
      <select name="" id="">
        <option value="">{`${user.username}'s workspace`}</option>
        <option value="" onClick={() => navigate("/settings")}>
          Settings
        </option>
        <option value="" onClick={() => dispatch(logoutAsync())}>
          logout
        </option>
      </select>

      <div>
        <button>create a folder</button>
        <ul>
          {folders.map((folder) => (
            <li key={folder._id}>
              <button onClick={() => handleFolderChange(folder._id)}>
                {folder.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button onClick={() => navigate("/formbot/new")}>create a formbot</button>

      <ul>
        {formbots.map((formbot) => (
          <li key={formbot._id}>
            <Link to={`/formbot/${formbot._id}`}>{formbot.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
