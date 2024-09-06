import { useDispatch } from "react-redux";
import { isEmail } from "validator";
import { toast } from "react-toastify";

import AuthForm from "../../components/AuthForm/AuthForm";
import Input from "../../components/Input/Input";
import { loginAsync } from "../../store/auth-slice";
import useInput from "../../hooks/useInput";

export default function Login() {
  const {
    value: email,
    handleChange: handleEmailChange,
    isError: isEmailError,
    shouldShowError: shouldShowEmailError,
    displayError: displayEmailError,
  } = useInput("", isEmail);

  const { value: password, handleChange: handlePasswordChange } = useInput("");

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isEmailError) {
      displayEmailError();
      return;
    }

    if (password.length === 0) return;

    const data = { email, password };
    try {
      await dispatch(loginAsync(data)).unwrap();
    } catch (err) {
      toast.error(err.message);
    }
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
        onBlur={displayEmailError}
        error={isEmailError}
        errorText={shouldShowEmailError && isEmailError && "Invalid email"}
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
