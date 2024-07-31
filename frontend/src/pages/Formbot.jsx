import { useEffect, useState } from "react";

import Message from "../components/Message";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { createFormbot, updateFormbot, fetchFormbot } from "../api/formbot";
import { isLength } from "validator";
import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { fetchFormbotAsync, selectFormbot } from "../store/formbot-slice";
import classes from "./Formbot.module.css";
import text from "../assets/text.svg";
import image from "../assets/image.svg";
import email from "../assets/email.svg";

const bubbles = ["Text", "Image", "Video", "GIF"];

const inputs = ["Text", "Number", "Email", "Phone", "Date", "Rating", "Button"];

export default function Formbot() {
  const { id } = useParams();

  const [searchParams] = useSearchParams();

  const [folder, setFolder] = useState(searchParams.get("folder"));

  // const formbot = useSelector(selectFormbot);
  // console.log({ formbot });
  // const {
  //   value: formname,
  //   handleChange: handleFormnameChange,
  //   error: formnameError,
  //   showError: showFormnameError,
  // } = useInput("", isLength({ min: 1 }));

  const [formName, setFormName] = useState("");
  const [messages, setMessages] = useState([]);
  const [theme, setTheme] = useState("light");

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (id === "new") {
  //     return;
  //   }

  //   dispatch(fetchFormbotAsync(id));
  // }, [id, dispatch]);

  useEffect(() => {
    (async () => {
      if (id !== "new") {
        const response = await fetchFormbot(id);
        const formbot = response.data.data;

        setFormName(formbot.name);
        setMessages(formbot.messages);
        setTheme(formbot.theme);
        setFolder(formbot.folder);
      }
    })();
  }, [id]);

  const handleAddMessage = (message) => {
    message.value = "";
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const handleValueChange = (messageIdx, value) => {
    setMessages((prevMessages) =>
      prevMessages.map((message, idx) =>
        idx === messageIdx ? { ...message, value } : message
      )
    );
  };

  const handleDelete = (messageIdx) => {
    setMessages((prevMessages) =>
      prevMessages.filter((message, idx) => idx !== messageIdx)
    );
  };

  const navigate = useNavigate();

  const handleSave = async () => {
    const data = {
      name: formName,
      messages,
      theme,
      folder,
    };

    if (id === "new") {
      const response = await createFormbot(data);
      const newFormbotId = response.data.data._id;
      navigate(`/formbot/${newFormbotId}`);
    } else {
      await updateFormbot(data, id);
    }
  };

  return (
    <div className={classes.formbot}>
      <div className={classes.header}>
        <input
          type="text"
          placeholder="Enter Form Name"
          value={formName}
          onChange={(event) => setFormName(event.target.value)}
          className={classes.formnameInput}
        />
        <ul className={classes.tabBtns}>
          {["Flow", "Theme", "Response"].map((el) => (
            <li key={el}>
              <button className={classes.tabBtn}>{el}</button>
            </li>
          ))}
        </ul>
        <ul className={classes.btns}>
          <li>
            <button className={classes.shareBtn}>Share</button>
          </li>
          <li>
            <button onClick={handleSave} className={classes.saveBtn}>
              Save
            </button>
          </li>

          <li>
            <button className={classes.closeBtn}>
              <CloseIcon className={classes.closeIcon} />
            </button>
          </li>
        </ul>
      </div>

      <div className={classes.main}>
        <div className={classes.messagePicker}>
          <div className={classes.bubbles}>
            <h2 className={classes.messageHeading}>Bubbles</h2>
            <ul className={classes.messageBtns}>
              {bubbles.map((valueType) => (
                <li key={"bubble-" + valueType}>
                  <button
                    onClick={() =>
                      handleAddMessage({ type: "bubble", valueType: valueType })
                    }
                    className={classes.messageBtn}
                  >
                    <img src={email} alt="" className={classes.messageLogo} />
                    <span>{valueType}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className={classes.inputs}>
            <h2 className={classes.messageHeading}>Inputs</h2>
            <ul className={classes.messageBtns}>
              {inputs.map((valueType) => (
                <li key={"input-" + valueType}>
                  <button
                    onClick={() =>
                      handleAddMessage({ type: "input", valueType: valueType })
                    }
                    className={classes.messageBtn}
                  >
                    <img src={email} alt="" className={classes.messageLogo} />
                    <span>{valueType}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div></div>
        <div>
          <ul className={classes.messages}>
            <li>start</li>
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
