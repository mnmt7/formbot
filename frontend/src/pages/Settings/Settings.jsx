import useInput from "../../hooks/useInput";
import { isEmail, isStrongPassword } from "validator";

import isUsername from "../../utils/isUsername";
import Input from "../../components/Input/Input";
import {
  logoutAsync,
  selectAuthStatus,
  selectAuthUser,
  updatePasswordAsync,
} from "../../store/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import classes from "./Settings.module.css";
import logoutIcon from "../../assets/logout.svg";
import { updatePassword } from "../../api/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const user = useSelector(selectAuthUser);
  const status = useSelector(selectAuthStatus);

  const { value: passwordOld, handleChange: handlePasswordOldChange } =
    useInput("");

  const { value: passwordNew, handleChange: handlePasswordNewChange } =
    useInput("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (passwordOld === passwordNew) {
      toast("Passwords are same");
      return;
    }

    if (!isStrongPassword(passwordNew)) {
      toast("New Password is not strong");
      return;
    }

    const data = { passwordOld, passwordNew };
    try {
      await dispatch(updatePasswordAsync(data)).unwrap();
      toast.success("Password updated successfully!");
      navigate("/workspace");
    } catch (err) {
      toast(err.message);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.settings}>
        <h1 className={classes.heading}>Settings</h1>

        <form onSubmit={handleSubmit} className={classes.form}>
          <Input value={user.username} disabled={true} />
          <Input value={user.email} disabled={true} />
          <Input
            id="password"
            placeholder="Old Password"
            type="password"
            value={passwordOld}
            onChange={handlePasswordOldChange}
          />
          <Input
            id="passwordNew"
            placeholder="New Password"
            type="password"
            value={passwordNew}
            onChange={handlePasswordNewChange}
          />
          <button
            className={`${classes.updateBtn} ${
              status === "loading" ? classes.disabled : ""
            }`}
            disabled={status === "loading"}
          >
            {status === "loading" ? "Updating..." : "Update"}
          </button>
        </form>

        <button
          className={classes.logoutBtn}
          onClick={() => dispatch(logoutAsync())}
        >
          <img
            className={classes.logoutIcon}
            src={logoutIcon}
            alt="Logout Icon"
          />
          <span className={classes.logoutTxt}>Log out</span>
        </button>
      </div>
    </div>
  );
}
