import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { createFormbot, updateFormbot, fetchFormbot } from "../../api/formbot";
import { isLength, isURL } from "validator";
import classes from "./Formbot.module.css";
import checkIcon from "../../assets/check.svg";
import Flow from "../../components/Flow/Flow";
import Response from "../../components/Response/Response";
import Theme from "../../components/Theme/Theme";

export default function Formbot() {
  const { id } = useParams();

  const [searchParams] = useSearchParams();

  const [folder, setFolder] = useState(searchParams.get("folder"));

  const [tab, setTab] = useState("Flow");

  const [formName, setFormName] = useState("");
  const [messages, setMessages] = useState([]);
  const [theme, setTheme] = useState("light");

  const [copied, setCopied] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (id !== "new") {
        try {
          const response = await fetchFormbot(id);
          const formbot = response.data.data;

          setFormName(formbot.name);
          setMessages(formbot.messages);
          setTheme(formbot.theme);
          setFolder(formbot.folder);
        } catch (err) {
          toast(err.message);
        }
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
