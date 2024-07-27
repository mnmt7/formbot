import { Link } from "react-router-dom";

import classes from "./Login.module.css";
import Input from "../components/Input";
import triangles from "../assets/triangles.svg";
import ellipse1 from "../assets/ellipse-1.svg";
import ellipse2 from "../assets/ellipse-2.svg";

export default function Login() {
  return (
    <div className={classes.loginContainer}>
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
      <form className={classes.loginForm}>
        <Input
          id="email"
          label="Email"
          placeholder="Enter your email"
          type="text"
        />
        <Input id="password" label="Password" placeholder="**********" />
        <div>
          <button className={classes.loginBtn}>Log In</button>
          <p className={classes.register}>
            Don't have an account?{" "}
            <Link to="/register" className={classes.registerLink}>
              Register here
            </Link>
          </p>
        </div>
      </form>
      <img src={triangles} className={classes.triangles} alt="" />
      <img src={ellipse1} className={classes.ellipse1} alt="" />
      <img src={ellipse2} className={classes.ellipse2} alt="" />
    </div>
  );
}
