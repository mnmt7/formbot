import useInput from "../hooks/useInput";
import { isEmail, isStrongPassword } from "validator";

import isUsername from "../utils/isUsername";
import Input from "../components/Input";
import { logoutAsync } from "../store/auth-slice";
import { useDispatch } from "react-redux";
import classes from "./Settings.module.css";

export default function Settings() {
  const {
    value: username,
    handleChange: handleUsernameChange,
    error: usernameError,
    showError: showUsernameError,
  } = useInput("", isUsername);

  const {
    value: email,
    handleChange: handleEmailChange,
    error: emailError,
    showError: showEmailError,
  } = useInput("", isEmail);

  const {
    value: password,
    handleChange: handlePasswordChange,
    error: passwordError,
    showError: showPasswordError,
  } = useInput("", isStrongPassword);

  const {
    value: passwordConfirm,
    handleChange: handlePasswordConfirmChange,
    error: passwordConfirmError,
    showError: showPasswordConfirmError,
  } = useInput("", (val) => password === val);

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = { username, email, password, passwordConfirm };
  };

  return (
    <div className={classes.settings}>
      <h1 className={classes.heading}>Settings</h1>

      <form onSubmit={handleSubmit} className={classes.form}>
        <Input
          id="username"
          placeholder="Username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
          error={usernameError}
          errorText={
            "Username must be minimum 5 characters long and maximum 15 characters long"
          }
          disabled={true}
        />
        <Input
          id="email"
          placeholder="Update Email"
          type="text"
          value={email}
          onChange={handleEmailChange}
          error={emailError}
          errorText={emailError && "Invalid email"}
        />
        <Input
          id="password"
          placeholder="Old Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          error={passwordError}
          errorText={
            passwordError &&
            "Password must be minimum 8 characters long and must contain at least one lowercase character, uppercase character, number and symbol"
          }
        />
        <Input
          id="passwordConfirm"
          placeholder="New Password"
          type="password"
          value={passwordConfirm}
          onChange={handlePasswordConfirmChange}
          onBlur={showPasswordConfirmError}
          error={passwordConfirmError}
          errorText={
            passwordConfirmError && "Enter same password in both fields"
          }
        />
      </form>

      <button onClick={() => dispatch(logoutAsync())}>logout</button>
    </div>
  );
}
