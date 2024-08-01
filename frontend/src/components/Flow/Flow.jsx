import Message from "../Message/Message";
import classes from "./Flow.module.css";
import image from "../../assets/image.svg";
import startIcon from "../../assets/start.svg";
import textInput from "../../assets/text-input.png";
import textBubble from "../../assets/text-bubble.svg";
import video from "../../assets/video.svg";
import gif from "../../assets/gif.svg";
import number from "../../assets/number.png";
import email from "../../assets/email.png";
import phone from "../../assets/phone.png";
import date from "../../assets/date.png";
import rating from "../../assets/rating.png";
import button from "../../assets/button.svg";
import { useRef } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const bubbles = [
  { type: "text", icon: textBubble },
  { type: "image", icon: image },
  { type: "video", icon: video },
  { type: "gif", icon: gif },
];

const inputs = [
  { type: "text", icon: textInput },
  { type: "number", icon: number },
  { type: "email", icon: email },
  { type: "phone", icon: phone },
  { type: "date", icon: date },
  { type: "rating", icon: rating },
  { type: "button", icon: button },
];

export default function Flow({
  messages,
  handleAddMessage,
  handleValueChange,
  handleDelete,
}) {
  const { id } = useParams();

  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  return (
    <div className={classes.main}>
      <div className={classes.messagePicker}>
        <div className={classes.bubbles}>
          <h2 className={classes.messageHeading}>Bubbles</h2>
          <ul className={classes.messageBtns}>
            {bubbles.map((el) => (
              <li key={"bubble-" + el.type}>
                <button
                  onClick={() =>
                    handleAddMessage({ type: "bubble", valueType: el.type })
                  }
                  className={classes.messageBtn}
                >
                  <img src={el.icon} alt="" className={classes.messageLogo} />
                  <span>{el.type}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className={classes.inputs}>
          <h2 className={classes.messageHeading}>Inputs</h2>
          <ul className={classes.messageBtns}>
            {inputs.map((el) => (
              <li key={"input-" + el.type}>
                <button
                  onClick={() =>
                    handleAddMessage({ type: "input", valueType: el.type })
                  }
                  className={classes.messageBtn}
                >
                  <img src={el.icon} alt="" className={classes.messageLogo} />
                  <span>{el.type}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <ul className={classes.messages}>
          <li className={classes.startMessage}>
            <img src={startIcon} alt="Start Icon" />
            <span className={classes.startText}>Start</span>
          </li>
          {messages.slice(id === "new" ? 0 : 4).map((message, idx) => (
            <Message
              key={idx}
              message={message}
              onChange={(event) =>
                handleValueChange(
                  id === "new" ? idx : idx + 4,
                  event.target.value
                )
              }
              onDelete={() => handleDelete(id === "new" ? idx : idx + 4)}
            />
          ))}
          <li ref={bottomRef}></li>
        </ul>
      </div>
    </div>
  );
}
