import { useDispatch, useSelector } from "react-redux";
import { logoutAsync, selectAuthUser } from "../store/auth-slice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchFolder } from "../api/folder";

export default function Workspace() {
  const user = useSelector(selectAuthUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentFolder, setCurrentFolder] = useState(user.rootFolder);
  const [folders, setFolders] = useState([]);
  const [formbots, setFormbots] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetchFolder(currentFolder);
      setFolders(response.data.data.folders);
      setFormbots(response.data.data.formbots);
    })();
  }, [user, currentFolder]);

  return (
    <div className="container">
      <div>
        <select name="" id="">
          <option value="">{`${user.username}'s workspace`}</option>
          <option value="" onClick={() => navigate("/settings")}>
            Settings
          </option>
          <option value="" onClick={() => dispatch(logoutAsync())}>
            logout
          </option>
        </select>
      </div>

      <div>
        <button>create a folder</button>
        <ul>
          {folders.map((folder) => (
            <li key={folder._id}>
              <button onClick={() => setCurrentFolder(folder._id)}>
                {folder.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button onClick={() => navigate(`/formbot/new?folder=${currentFolder}`)}>
        create a formbot
      </button>

      <ul>
        {formbots.map((formbot) => (
          <li key={formbot._id}>
            <Link to={`/formbot/${formbot._id}`}>{formbot.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
