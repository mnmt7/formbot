import { useEffect, useState } from "react";
import Message from "../components/Message";
import { useParams, useSearchParams } from "react-router-dom";
import { createFormbot, updateFormbot, fetchFormbot } from "../api/formbot";
import { isLength } from "validator";
import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { fetchFormbotAsync, selectFormbot } from "../store/formbot-slice";
import classes from "./Flow.module.css";
import image from "../assets/image.svg";
import startIcon from "../assets/start.svg";
import textInput from "../assets/text-input.png";
import textBubble from "../assets/text-bubble.svg";
import video from "../assets/video.svg";
import gif from "../assets/gif.svg";
import number from "../assets/number.png";
import email from "../assets/email.png";
import phone from "../assets/phone.png";
import date from "../assets/date.png";
import rating from "../assets/rating.png";
import button from "../assets/button.svg";

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
          {messages.map((message, idx) => (
            <Message
              key={idx}
              message={message}
              onChange={(event) => handleValueChange(idx, event.target.value)}
              onDelete={() => handleDelete(idx)}
            /> // todo: using idx as key. better will be id since idx is being used in onChange too
          ))}
        </ul>
      </div>
    </div>
  );
}

function CloseIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2.5}
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  );
}

function Text() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
      />
    </svg>
  );
}

function Image() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
      />
    </svg>
  );
}

function Gif() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12.75 8.25v7.5m6-7.5h-3V12m0 0v3.75m0-3.75H18M9.75 9.348c-1.03-1.464-2.698-1.464-3.728 0-1.03 1.465-1.03 3.84 0 5.304 1.03 1.464 2.699 1.464 3.728 0V12h-1.5M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
      />
    </svg>
  );
}
