import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { fetchChat, sendResponse } from "../../api/chat";
import classes from "./Chat.module.css";
import botImg from "../../assets/bot.svg";
import sendIcon from "../../assets/send.svg";
import { isLength, isMobilePhone, isNumeric } from "validator";
import isEmail from "validator/lib/isEmail";
import formatDate from "../../utils/formatDate";
import { toast } from "react-toastify";

const dummyMessage = {
  type: "bubble",
  valueType: "text",
  value: "...",
};

export default function Chat() {
  const { id } = useParams();

  const [messages, setMessages] = useState([]);
  const [response, setResponse] = useState(null);
  const [responseId, setResponseId] = useState(null);
  const [nextMessage, setNextMessage] = useState(null);
  const [error, setError] = useState("");
  const chatRef = useRef();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchChat(id);
        setMessages(res.data.data.messages);

        if (res.data.data.response) {
          const responseObj = {
            ...res.data.data.response,
            value: res.data.data.response.value || "",
          };
          setResponse(responseObj);
        } else {
          setResponse(null);
        }

        setResponseId(res.data.data.responseId);
        setNextMessage(res.data.data.nextMessage);
      } catch (err) {
        toast(err.message);
      }
    })();
  }, [id]);

  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  const handleInputChange = (event) => {
    setError("");
    setResponse((prevResponse) => ({
      ...prevResponse,
      value: event.target.value,
    }));
  };

  const processResponse = async (res) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      response,
      ...res.data.data.messages,
    ]);

    if (res.data.data.response) {
      const responseObj = {
        ...res.data.data.response,
        value: res.data.data.response.value || "",
      };
      setResponse(responseObj);
    } else {
      setResponse(null);
    }

    setResponseId(res.data.data.responseId);
    setNextMessage(res.data.data.nextMessage);
  };

  const handleSendResponse = async () => {
    const result = validateResponse(response);

    if (result.err) {
      setError(result.err);
      return;
    }

    const data = {
      response:
        response.valueType === "button"
          ? null
          : {
              response: response.value,
              question: response._id,
            },
      responseId,
      nextMessage,
    };

    const res = await sendResponse(id, data);
    processResponse(res);
  };

  return (
    <div ref={chatRef} className={classes.chat}>
      <ul className={classes.messages}>
        {messages.map((message) => (
          <ChatMessage key={message._id} message={message} />
        ))}
      </ul>

      {response ? (
        <UserResponse
          response={response}
          handleSendResponse={handleSendResponse}
          handleInputChange={handleInputChange}
          error={error}
        />
      ) : (
        <div className={classes.userInputContainer} />
      )}
    </div>
  );
}

function validateResponse(response) {
  const { value, valueType } = response;

  let err = "";
  if (valueType === "text" && !isLength(value, { min: 1 })) {
    err = "Required field";
  } else if (valueType === "number" && !isNumeric(value)) {
    err = "Please enter a valid number";
  } else if (valueType === "email" && !isEmail(value)) {
    err = "Please enter a valid email";
  } else if (valueType === "phone" && !isMobilePhone(value, "en-IN")) {
    err = "Please enter a valid phone number";
  }

  return { err };
}

function ChatMessage({ message }) {
  let content = [];

  if (message.type === "bubble") {
    content = (
      <>
        <img src={botImg} alt="Bot Image" className={classes.bubbleImg} />
        {message.valueType === "text" && (
          <div className={classes.message}>{message.value}</div>
        )}
        {["image", "gif"].includes(message.valueType) && (
          <img src={message.value} alt="" className={classes.nonTextMessage} />
        )}
        {message.valueType === "video" && (
          <video
            className={classes.nonTextMessage}
            src={message.value}
            controls
          />
        )}
      </>
    );
  } else if (message.valueType === "rating") {
    content = (
      <>
        <RatingContainer value={message.value} disabled={true} />
        <button className={`${classes.sendBtn} ${classes.disabled}`}>
          <img src={sendIcon} alt="" className={classes.sendIcon} />
        </button>
      </>
    );
  } else if (message.valueType === "button") {
    content = <div className={classes.sentBtn}>{message.value}</div>;
  } else {
    content = (
      <>
        <UserInput
          value={
            message.valueType === "date"
              ? formatDate(message.value)
              : message.value
          }
          disabled={true}
        />
        <button className={`${classes.sendBtn} ${classes.disabled}`}>
          <img src={sendIcon} alt="" className={classes.sendIcon} />
        </button>
      </>
    );
  }

  return (
    <li className={message.type === "input" ? classes.input : classes.bubble}>
      <div className={classes.messageContainer}>{content}</div>
    </li>
  );
}

function UserResponse({
  response,
  handleSendResponse,
  handleInputChange,
  error,
}) {
  let content;

  if (response.valueType === "button") {
    content = (
      <button onClick={handleSendResponse} className={classes.sendBtn}>
        {response.value}
      </button>
    );
  } else if (response.valueType === "rating") {
    content = (
      <RatingContainer
        value={response.value}
        handleInputChange={handleInputChange}
      />
    );
  } else if (response.valueType === "date") {
    content = (
      <DatePicker
        selected={response.value}
        onChange={(date) => handleInputChange({ target: { value: date } })}
        placeholderText="Select a date"
        className={classes.userInput}
      />
    );
  } else {
    content = (
      <UserInput
        error={error}
        value={response.value}
        handleInputChange={handleInputChange}
      />
    );
  }

  return (
    <div className={classes.userInputContainer}>
      {content}
      {response.valueType !== "button" && (
        <button onClick={handleSendResponse} className={classes.sendBtn}>
          <img src={sendIcon} alt="" className={classes.sendIcon} />
        </button>
      )}
    </div>
  );
}

function RatingContainer({ value, disabled, handleInputChange }) {
  return (
    <div
      className={`${classes.ratingContainer} ${
        disabled ? classes.disabled : ""
      }`}
    >
      {[1, 2, 3, 4, 5].map((el) => (
        <button
          key={el}
          onClick={() => {
            if (disabled) return;
            handleInputChange({ target: { value: el } });
          }}
          className={value === el ? classes.ratingActive : classes.rating}
        >
          {el}
        </button>
      ))}
    </div>
  );
}

function UserInput({ error, value, handleInputChange, disabled }) {
  return (
    <div className={classes.relative}>
      <input
        className={`${classes.userInput} ${error ? classes.userInputError : ""}
      
        ${disabled ? classes.disabled : ""}`}
        value={value}
        onChange={handleInputChange}
      />
      {error && <p className={classes.error}>{error}</p>}
    </div>
  );
}
