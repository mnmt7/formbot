import { useDispatch } from "react-redux";
import { isEmail, isStrongPassword } from "validator";

import AuthForm from "../../components/AuthForm/AuthForm";
import Input from "../../components/Input/Input";
import { registerAsync } from "../../store/auth-slice";
import useInput from "../../hooks/useInput";
import isUsername from "../../utils/isUsername";
import { toast } from "react-toastify";

export default function Register() {
  const {
    value: username,
    handleChange: handleUsernameChange,
    isError: isUsernameError,
    shouldShowError: shouldShowUsernameError,
    displayError: displayUsernameError,
  } = useInput("", isUsername);

  const {
    value: email,
    handleChange: handleEmailChange,
    isError: isEmailError,
    shouldShowError: shouldShowEmailError,
    displayError: displayEmailError,
  } = useInput("", isEmail);

  const {
    value: password,
    handleChange: handlePasswordChange,
    isError: isPasswordError,
    shouldShowError: shouldShowPasswordError,
    displayError: displayPasswordError,
  } = useInput("", isStrongPassword);

  const {
    value: passwordConfirm,
    handleChange: handlePasswordConfirmChange,
    isError: isPasswordConfirmError,
    shouldShowError: shouldShowPasswordConfirmError,
    displayError: displayPasswordConfirmError,
  } = useInput("", (val) => password === val);

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      isUsernameError ||
      isEmailError ||
      isPasswordError ||
      isPasswordConfirmError
    ) {
      displayUsernameError();
      displayEmailError();
      displayPasswordError();
      displayPasswordConfirmError();
      return;
    }

    const data = { username, email, password, passwordConfirm };

    try {
      await dispatch(registerAsync(data)).unwrap();
    } catch (err) {
      toast(err.message);
    }
  };

  return (
    <>
      <AuthForm isLogin={false} onSubmit={handleSubmit}>
        <Input
          id="username"
          label="Username"
          placeholder="Enter a username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
          onBlur={displayUsernameError}
          errorText={
            shouldShowUsernameError &&
            isUsernameError &&
            "Min 5 and max 15 characters long"
          }
        />
        <Input
          id="email"
          label="Email"
          placeholder="Enter your email"
          type="text"
          value={email}
          onChange={handleEmailChange}
          onBlur={displayEmailError}
          errorText={shouldShowEmailError && isEmailError && "Invalid email"}
        />
        <Input
          id="password"
          label="Password"
          placeholder="**********"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          onBlur={displayPasswordError}
          errorText={
            shouldShowPasswordError &&
            isPasswordError &&
            "Min 8 chars (lowercase, uppercase, number and symbol)"
          }
        />
        <Input
          id="passwordConfirm"
          label="PasswordConfirm"
          placeholder="**********"
          type="password"
          value={passwordConfirm}
          onChange={handlePasswordConfirmChange}
          onBlur={displayPasswordConfirmError}
          errorText={
            shouldShowPasswordConfirmError &&
            isPasswordConfirmError &&
            "Enter same password in both fields"
          }
        />
      </AuthForm>
    </>
  );
}
