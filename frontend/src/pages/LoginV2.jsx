import { useDispatch } from "react-redux";
import { isEmail } from "validator";

import AuthForm from "../components/AuthForm";
import Input from "../components/Input";
import { loginAsync } from "../store/auth-slice";
import useInput from "../hooks/useInput";

export default function Login() {
  const {
    value: email,
    handleChange: handleEmailChange,
    error: emailError,
    showError: showEmailError,
  } = useInput("", isEmail);

  const { value: password, handleChange: handlePasswordChange } = useInput("");

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = { email, password };

    dispatch(loginAsync(data));
  };
  return (
    <AuthForm isLogin={true} onSubmit={handleSubmit}>
      <Input
        id="email"
        label="Email"
        placeholder="Enter your email"
        type="text"
        value={email}
        onChange={handleEmailChange}
        onBlur={showEmailError}
        error={emailError}
        errorText={emailError && "Invalid email"}
      />
      <Input
        id="password"
        label="Password"
        placeholder="**********"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
    </AuthForm>
  );
}
