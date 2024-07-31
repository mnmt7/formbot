import { Link, Navigate } from "react-router-dom";

import classes from "./AuthForm.module.css";
import triangles from "../assets/triangles.svg";
import ellipse1 from "../assets/ellipse-1.svg";
import ellipse2 from "../assets/ellipse-2.svg";
import { useSelector } from "react-redux";
import {
  selectAuthError,
  selectAuthStatus,
  selectAuthUser,
} from "../store/auth-slice";

export default function AuthForm({ isLogin, children, onSubmit }) {
  const user = useSelector(selectAuthUser);
  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);

  if (user) {
    return <Navigate to="/workspace" />;
  }

  return (
    <div className={classes.container}>
      <Link to="/" className={classes.back}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={classes.backIcon}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
      </Link>
      <form className={classes.form} onSubmit={onSubmit}>
        <p className={classes.error}>{error}</p>
        {children}
        <div>
          <button className={classes.submitBtn} disabled={status === "loading"}>
            {isLogin
              ? status === "loading"
                ? "Logging In..."
                : "Log In"
              : status === "loading"
              ? "Signing Up..."
              : "Sign Up"}
          </button>
          <p className={classes.register}>
            {isLogin ? (
              <>
                Don't have an account?{" "}
                <Link to="/register" className={classes.registerLink}>
                  Register here
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link to="/login" className={classes.registerLink}>
                  Login
                </Link>
              </>
            )}
          </p>
        </div>
      </form>
      <img src={triangles} className={classes.triangles} alt="" />
      <img src={ellipse1} className={classes.ellipse1} alt="" />
      <img src={ellipse2} className={classes.ellipse2} alt="" />
    </div>
  );
}
