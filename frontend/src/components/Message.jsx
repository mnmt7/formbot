import deleteIcon from "../assets/delete.svg";
import classes from "./Message.module.css";

export default function Message({ message, onChange, onDelete }) {
  const { type, valueType, value } = message;

  return (
    <li className={classes.message}>
      <button className={classes.deleteBtn}>
        <img src={deleteIcon} alt="Delete Icon" onClick={onDelete} />
      </button>
      <p className={classes.valueType}>{valueType}</p>
      {type === "bubble" ? (
        <input
          className={classes.input}
          placeholder={
            valueType === "Text" ? "Click here to edit" : "Click to add link"
          }
          value={value}
          onChange={onChange}
        />
      ) : (
        <>
          {valueType === "Button" ? (
            <input
              value={value}
              onChange={onChange}
              className={classes.input}
            />
          ) : (
            <p
              className={classes.hint}
            >{`Hint : User will input a ${valueType} on his form`}</p>
          )}
        </>
      )}
    </li>
  );
}
