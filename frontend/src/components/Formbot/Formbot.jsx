import classes from "./Formbot.module.css";
import deleteIcon from "../../assets/delete.svg";
import { Link } from "react-router-dom";

export default function Formbot({ formbot, onFormbotDelete }) {
  return (
    <li className={classes.formbotContainer}>
      <Link to={`/formbots/${formbot._id}`} className={classes.formbot}>
        {formbot.name}
      </Link>

      <button className={classes.deleteBtn} onClick={onFormbotDelete}>
        <img src={deleteIcon} alt="Delete Icon" />
      </button>
    </li>
  );
}
