import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { fetchFormbot } from "../../api/formbot";
import { isLength, isURL } from "validator";
import classes from "./Formbot.module.css";
import checkIcon from "../../assets/check.svg";
import Flow from "../../components/Flow/Flow";
import Response from "../../components/Response/Response";
import Theme from "../../components/Theme/Theme";
import { useDispatch } from "react-redux";
import {
  createFormbotAsync,
  selectFolderStatus,
  updateFormbotAsync,
} from "../../store/folder-slice";
import Skeleton from "../../components/Skeleton/Skeleton";

export default function Formbot() {
  const { id } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const [folder, setFolder] = useState(searchParams.get("folder"));
  const tab = searchParams.get("tab") || "Flow";
  // const [tab, setTab] = useState("Flow");

  const [formName, setFormName] = useState("");
  const [messages, setMessages] = useState([]);
  const [theme, setTheme] = useState("light");

  const [copied, setCopied] = useState(false);

  const status = useSelector(selectFolderStatus);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    (async () => {
      if (id !== "new") {
        setIsFetching(true);
        try {
          const response = await fetchFormbot(id);
          const formbot = response.data.data;

          setFormName(formbot.name);
          setMessages(formbot.messages);
          setTheme(formbot.theme);
          setFolder(formbot.folder);
        } catch (err) {
          toast(err.message);
        } finally {
          setIsFetching(false);
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
      toast.error("Enter form name!");
      return;
    }

    if (messages.length === 0) {
      toast.error("Add at least one message");
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

    let toastId;

    try {
      if (id === "new") {
        toastId = toast.loading("Creating formbot");
        const response = await dispatch(createFormbotAsync(data)).unwrap();
        const newFormbotId = response.data._id;
        navigate(`/formbots/${newFormbotId}`);
        toast.update(toastId, {
          render: "Formbot created!",
          type: "success",
          isLoading: false,
          autoClose: true,
        });
      } else {
        toastId = toast.loading("Saving formbot");
        await dispatch(updateFormbotAsync({ data, id })).unwrap();
        toast.update(toastId, {
          render: "Formbot saved!",
          type: "success",
          isLoading: false,
          autoClose: true,
        });
      }
    } catch (err) {
      console.log({ err });
      toast.update(toastId, {
        render: ` Formbot ${id === "new" ? "creation" : "saving"} failed!`,
        type: "error",
        isLoading: false,
        autoClose: true,
      });
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
        isFetching={isFetching}
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
            <img src={checkIcon} alt="Check icon" />
            <span>Link Copied</span>
          </p>
        )}
        {isFetching ? (
          <Skeleton height={28} width={250} count={1} />
        ) : (
          <input
            type="text"
            placeholder="Enter Form Name"
            value={formName}
            onChange={(event) => setFormName(event.target.value)}
            className={`${classes.formnameInput} ${
              tab !== "Flow" ? classes.hidden : ""
            }`}
          />
        )}

        <ul className={classes.tabBtns}>
          {["Flow", "Theme", "Response"].map((el) => (
            <li key={el}>
              <button
                className={`${classes.tabBtn} ${
                  tab === el ? classes.tabBtnActive : ""
                }`}
                onClick={() => {
                  // setTab(el);
                  const params = { tab: el };
                  if (id === "new") {
                    params.folder = folder;
                  }
                  setSearchParams(params);
                }}
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
            <button
              onClick={handleSave}
              className={classes.saveBtn}
              disabled={status === "loading" || isFetching}
            >
              {status === "loading" ? "Saving..." : "Save"}
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
