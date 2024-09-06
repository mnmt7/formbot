import { useEffect, useRef } from "react";

import deleteIcon from "../../assets/delete.svg";
import classes from "./Message.module.css";

export default function Message({
  message,
  onChange,
  onDelete,
  isLast,
  shouldScroll,
}) {
  const { type, valueType, value } = message;
  const messageRef = useRef();

  useEffect(() => {
    if (isLast && shouldScroll) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isLast, shouldScroll]);

  const inputRef = useRef();

  useEffect(() => {
    if (isLast && inputRef.current && shouldScroll) {
      inputRef.current.focus();
    }
  });

  return (
    <li className={classes.message} ref={messageRef}>
      <button className={classes.deleteBtn} onClick={onDelete}>
        <img src={deleteIcon} alt="Delete Icon" />
      </button>
      <p className={classes.valueType}>{valueType}</p>
      {type === "bubble" ? (
        <input
          className={`${classes.input} ${
            message.error ? classes.inputError : ""
          }`}
          placeholder={
            valueType === "text" ? "Click here to edit" : "Click to add link"
          }
          value={value}
          onChange={onChange}
          ref={inputRef}
        />
      ) : (
        <>
          {valueType === "button" ? (
            <input
              value={value}
              onChange={onChange}
              className={`${classes.input} ${
                message.error ? classes.inputError : ""
              }`}
            />
          ) : (
            <p
              className={classes.hint}
            >{`Hint : User will input a ${valueType} on his form`}</p>
          )}
        </>
      )}
      {message.error && <p className={classes.error}>{message.error}</p>}
    </li>
  );
}
