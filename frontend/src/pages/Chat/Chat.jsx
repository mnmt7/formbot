import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { isLength, isMobilePhone, isNumeric } from "validator";
import isEmail from "validator/lib/isEmail";
import { toast } from "react-toastify";

import { fetchChat, sendResponse } from "../../api/chat";
import classes from "./Chat.module.css";
import botImg from "../../assets/bot.svg";
import sendIcon from "../../assets/send.svg";
import formatDate from "../../utils/formatDate";

export default function Chat() {
  const { id } = useParams();

  const [currMessageIdx, setCurrMessageIdx] = useState(0);
  const [messages, setMessages] = useState([]);
  const [response, setResponse] = useState(null);
  const [responseId, setResponseId] = useState(null);
  const [nextMessage, setNextMessage] = useState(null);
  const [error, setError] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const loaderRef = useRef();

  useEffect(() => {
    (async () => {
      try {
        setIsFetching(true);
        const res = await fetchChat(id);
        processResponse(true, res);
        // setMessages(res.data.data.messages);

        // if (res.data.data.response) {
        //   const responseObj = {
        //     ...res.data.data.response,
        //     value: res.data.data.response.value || "",
        //   };
        //   setResponse(responseObj);
        // } else {
        //   setResponse(null);
        // }

        // setResponseId(res.data.data.responseId);
        // setNextMessage(res.data.data.nextMessage);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setIsFetching(false);
      }
    })();
  }, [id]);

  useEffect(() => {
    if (currMessageIdx < messages.length - 1) {
      setTimeout(
        () => setCurrMessageIdx((prevCurrMessageIdx) => prevCurrMessageIdx + 1),
        1000
      );
    }
  }, [currMessageIdx, messages.length]);

  const processResponse = async (isInitial, res) => {
    if (isInitial) {
      setMessages(res.data.data.messages);
    } else {
      setMessages((prevMessages) => [
        ...prevMessages,
        // response,
        ...res.data.data.messages,
      ]);
    }

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

  const handleSendResponse = useCallback(async () => {
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

    setMessages((prevMessages) => [...prevMessages, response]);
    setCurrMessageIdx((prevCurrMessageIdx) => prevCurrMessageIdx + 1);
    setResponse(null);
    setIsFetching(true);
    // setTimeout(() => setIsFetching(true), 100);

    try {
      const res = await sendResponse(id, data);
      processResponse(false, res);
    } catch (err) {
      toast.error("Response not sent! Try again");
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages];
        newMessages.pop();
        return newMessages;
      });

      setResponse(response);
    } finally {
      setIsFetching(false);
    }
  }, [id, nextMessage, response, responseId]);

  const handleEnterKey = useCallback(
    (event) => event.key === "Enter" && handleSendResponse(),
    [handleSendResponse]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEnterKey);
    return () => document.removeEventListener("keydown", handleEnterKey);
  }, [handleEnterKey]);

  useEffect(() => {
    if (loaderRef.current) {
      loaderRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currMessageIdx]);

  const handleInputChange = (event) => {
    setError("");
    setResponse((prevResponse) => ({
      ...prevResponse,
      value: event.target.value,
    }));
  };

  console.log({ messages, isFetching });

  return (
    <div className={classes.chat}>
      <ul className={classes.messages}>
        {messages.map((message, idx, arr) =>
          idx <= currMessageIdx ? (
            <ChatMessage
              key={message._id}
              message={message}
              showDP={idx === arr.length - 1 || arr[idx + 1].type === "input"}
            />
          ) : undefined
        )}

        {(isFetching || currMessageIdx < messages.length - 1) && (
          <li className={classes.messageContainer} ref={loaderRef}>
            <img src={botImg} alt="Bot Image" className={classes.bubbleImg} />
            <div className={classes.loader} />
          </li>
        )}
      </ul>

      {response && !(isFetching || currMessageIdx < messages.length - 1) && (
        <UserResponse
          response={response}
          handleSendResponse={handleSendResponse}
          handleInputChange={handleInputChange}
          error={error}
        />
      )}

      {/* {response ? (
        <UserResponse
          response={response}
          handleSendResponse={handleSendResponse}
          handleInputChange={handleInputChange}
          error={error}
        />
      ) : (
        <div className={classes.userInputContainer} />
      )} */}
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

function ChatMessage({ message, showDP }) {
  let content = [];

  if (message.type === "bubble") {
    content = (
      <div className={classes.messageContainer}>
        {showDP ? (
          <img src={botImg} alt="Bot Image" className={classes.bubbleImg} />
        ) : (
          <div />
        )}
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
      </div>
    );
  }
  // else if (message.valueType === "rating") {
  //   content = (
  //     <>
  //       <RatingContainer value={message.value} disabled={true} />
  //       <button className={`${classes.sendBtn} ${classes.disabled}`}>
  //         <img src={sendIcon} alt="" className={classes.sendIcon} />
  //       </button>
  //     </>
  //   );
  // } else if (message.valueType === "button") {
  //   content = <div className={classes.sentBtn}>{message.value}</div>;
  // }
  else {
    content = (
      <div className={classes.sentMessage}>
        {message.valueType === "date"
          ? formatDate(message.value)
          : message.value}
      </div>
      // <>
      //   <UserInput
      //     value={
      //       message.valueType === "date"
      //         ? formatDate(message.value)
      //         : message.value
      //     }
      //     disabled={true}
      //   />
      //   <button className={`${classes.sendBtn} ${classes.disabled}`}>
      //     <img src={sendIcon} alt="" className={classes.sendIcon} />
      //   </button>
      // </>
    );
  }

  return (
    <li className={message.type === "input" ? classes.input : classes.bubble}>
      {content}
    </li>
  );
}

function UserResponse({
  response,
  handleSendResponse,
  handleInputChange,
  error,
}) {
  const userInputRef = useRef();
  useEffect(() => {
    if (userInputRef.current) {
      userInputRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

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
    <div className={classes.userInputContainer} ref={userInputRef}>
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
