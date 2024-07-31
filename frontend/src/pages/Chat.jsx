import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchChat, sendResponse } from "../api/chat";
import classes from "./Chat.module.css";
import botImg from "../assets/bot.svg";
import sendIcon from "../assets/send.svg";
import { isLength, isMobilePhone, isNumeric } from "validator";
import isEmail from "validator/lib/isEmail";

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

  const handleSendResponseV1 = async () => {
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

    if (err) {
      setError(err);
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

    setMessages((prevMessages) => [
      ...prevMessages,
      response,
      ...res.data.data.messages,
    ]);

    if (res.data.data.response) {
      const responseObj = { ...res.data.data.response, value: "" };
      setResponse(responseObj);
    } else {
      setResponse(null);
    }

    setResponseId(res.data.data.responseId);
    setNextMessage(res.data.data.nextMessage);
  };

  const processResponse = (res) => {
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
  console.log({ message });
  return (
    <li className={message.type === "input" ? classes.input : classes.bubble}>
      <div className={classes.messageContainer}>
        {message.type === "bubble" && (
          <img src={botImg} alt="Bot Image" className={classes.bubbleImg} />
        )}
        {message.valueType !== "image" && message.valueType !== "gif" && (
          <div>
            <span
              className={
                message.valueType === "button"
                  ? classes.sentBtn
                  : classes.message
              }
            >
              {message.value}
              {message.type === "input" && message.valueType !== "button" && (
                <button className={classes.disabledBtn}>
                  <img src={sendIcon} alt="" className={classes.sendIcon} />
                </button>
              )}
            </span>
          </div>
        )}
        {(message.valueType === "image" || message.valueType === "gif") && (
          <img className={classes.imgMessage} src={message.value} />
        )}
      </div>
    </li>
  );
}

function UserResponse({
  response,
  handleSendResponse,
  handleInputChange,
  error,
}) {
  return (
    <div className={classes.userInputContainer}>
      {response.valueType === "button" && (
        <button onClick={handleSendResponse} className={classes.sendBtn}>
          {response.value}
        </button>
      )}

      {response.valueType !== "button" && (
        <>
          {response.valueType === "rating" ? (
            <div className={classes.ratingContainer}>
              {[1, 2, 3, 4, 5].map((el) => (
                <button
                  key={el}
                  onClick={() => {
                    handleInputChange({ target: { value: el } });
                  }}
                  className={
                    response.value === el
                      ? classes.ratingActive
                      : classes.rating
                  }
                >
                  {el}
                </button>
              ))}
            </div>
          ) : (
            <div className={classes.relative}>
              <input
                className={`${classes.userInput} ${
                  error ? classes.userInputError : ""
                }`}
                value={response.value}
                onChange={handleInputChange}
              />
              {error && <p className={classes.error}>{error}</p>}
            </div>
          )}
          <button onClick={handleSendResponse} className={classes.sendBtn}>
            <img src={sendIcon} alt="" className={classes.sendIcon} />
          </button>
        </>
      )}
    </div>
  );
}

/*




          (response.valueType === "rating" ? (
  <div className={classes.ratingContainer}>
    {[1, 2, 3, 4, 5].map((el) => (
      <button
        key={el}
        onClick={() => {
          handleInputChange({ target: { value: el } });
        }}
        className={
          response.value === el ? classes.ratingActive : classes.rating
        }
      >
        {el}
      </button>
    ))}
  </div>
) : (
  <>
    <input
      className={`${classes.userInput} ${
        error ? classes.userInputError : ""
      }`}
      value={response.value}
      onChange={handleInputChange}
    />

    {error && <p className={classes.error}>{error}</p>}
  </>
))

*/
