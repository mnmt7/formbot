import classes from "./Input.module.css";

export default function Input({ id, label, error, errorText, ...props }) {
  return (
    <p className={classes.inputContainer}>
      {label && (
        <label
          htmlFor={id}
          className={`${classes.label} ${error ? classes.labelError : ""}`}
        >
          {label}
        </label>
      )}
      <input
        id={id}
        {...props}
        className={`${classes.input}  ${error ? classes.inputError : ""}`}
      />
      {error && <p className={classes.error}>{errorText}</p>}
    </p>
  );
}
