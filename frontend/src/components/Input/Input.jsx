import classes from "./Input.module.css";

export default function Input({ id, label, error, errorText, ...props }) {
  return (
    <p className={classes.inputContainer}>
      {label && (
        <label
          htmlFor={id}
          className={`${classes.label} ${errorText ? classes.labelError : ""}`}
        >
          {label}
        </label>
      )}
      <input
        id={id}
        {...props}
        className={`${classes.input}  ${errorText ? classes.inputError : ""}`}
      />
      {errorText && <p className={classes.error}>{errorText}</p>}
    </p>
  );
}
