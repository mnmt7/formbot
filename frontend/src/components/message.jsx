export default function Message({ message, onChange, onDelete }) {
  const { type, valueType, value } = message;

  return (
    <li>
      <button onClick={onDelete}>x</button>
      <p>{valueType}</p>
      {type === "bubble" ? (
        <input
          placeholder={
            valueType === "text" ? "Click here to edit" : "Click to add link"
          }
          value={value}
          onChange={onChange}
        />
      ) : (
        <>
          {valueType === "button" ? (
            <input value={value} />
          ) : (
            <p>{`Hint : User will input a ${valueType} on his form`}</p>
          )}
        </>
      )}
    </li>
  );
}
