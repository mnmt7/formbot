import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Message from "../components/Message";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { createFormbot, updateFormbot, fetchFormbot } from "../api/formbot";
import { isLength, isURL } from "validator";
import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { fetchFormbotAsync, selectFormbot } from "../store/formbot-slice";
import classes from "./Formbot.module.css";
import text from "../assets/text.svg";
import image from "../assets/image.svg";
import email from "../assets/email.svg";
import checkIcon from "../assets/check.svg";
import Flow from "../components/Flow";
import Response from "../components/Response";
import Theme from "../components/Theme";

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

  const [tab, setTab] = useState("Flow");

  const [formName, setFormName] = useState("");
  const [messages, setMessages] = useState([]);
  const [theme, setTheme] = useState("light");

  const [copied, setCopied] = useState(false);

  const navigate = useNavigate();

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
      prevMessages.map((message, idx) => {
        if (idx === messageIdx) {
          const newMessage = { ...message, value };
          delete newMessage.error;
          return newMessage;
        } else {
          return message;
        }
      })
    );
  };

  const handleDelete = (messageIdx) => {
    setMessages((prevMessages) =>
      prevMessages.filter((message, idx) => idx !== messageIdx)
    );
  };

  const handleSave = async () => {
    if (formName.length === 0) {
      toast("Enter form name!");
      return;
    }

    if (messages.length === 0) {
      toast("Add at least one message");
      return;
    }

    let isError = false;

    const messagesWithErrors = messages.map((message) => {
      if (
        ((message.type === "bubble" && message.valueType === "text") ||
          message.valueType === "button") &&
        !isLength(message.value, { min: 1 })
      ) {
        isError = true;
        return { ...message, error: "Required field" };
      } else if (
        ["image", "video", "gif"].includes(message.valueType) &&
        !isURL(message.value)
      ) {
        isError = true;
        return { ...message, error: "Enter valid url" };
      } else {
        return { ...message };
      }
    });

    if (isError) {
      setMessages(messagesWithErrors);
      return;
    }

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
      toast("Formbot saved!");
    } else {
      await updateFormbot(data, id);
      toast("Formbot updated!");
    }
  };

  const handleCopy = async () => {
    const shareLink = `${window.location.hostname}/chat/${id}`;
    await navigator.clipboard.writeText(shareLink);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  const handleClose = () => {
    navigate("/workspace");
  };

  let content;

  if (tab === "Flow") {
    content = (
      <Flow
        messages={messages}
        handleAddMessage={handleAddMessage}
        handleValueChange={handleValueChange}
        handleDelete={handleDelete}
      />
    );
  } else if (tab === "Theme") {
    content = <Theme currTheme={theme} handleSelectTheme={setTheme} />;
  } else if (tab === "Response") {
    content = <Response id={id} />;
  }

  return (
    <div className={classes.formbot}>
      <div className={classes.header}>
        {copied && (
          <p className={classes.copied}>
            <img src={checkIcon} alt="" />
            <span>Link Copied</span>
          </p>
        )}
        <input
          type="text"
          placeholder="Enter Form Name"
          value={formName}
          onChange={(event) => setFormName(event.target.value)}
          className={`${classes.formnameInput} ${
            tab !== "Flow" ? classes.hidden : ""
          }`}
        />
        <ul className={classes.tabBtns}>
          {["Flow", "Theme", "Response"].map((el) => (
            <li key={el}>
              <button
                className={`${classes.tabBtn} ${
                  tab === el ? classes.tabBtnActive : ""
                }`}
                onClick={() => setTab(el)}
              >
                {el}
              </button>
            </li>
          ))}
        </ul>
        <ul className={classes.btns}>
          <li>
            <button
              className={`${classes.shareBtn} 
            ${id !== "new" ? classes.shareBtnActive : ""}
            `}
              onClick={handleCopy}
            >
              Share
            </button>
          </li>
          <li>
            <button onClick={handleSave} className={classes.saveBtn}>
              Save
            </button>
          </li>

          <li>
            <button className={classes.closeBtn} onClick={handleClose}>
              <CloseIcon className={classes.closeIcon} />
            </button>
          </li>
        </ul>
      </div>
      {content}
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
