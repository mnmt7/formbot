import { useEffect, useState } from "react";
import Message from "../components/message";
import { useParams, useSearchParams } from "react-router-dom";
import { createFormbot, updateFormbot, fetchFormbot } from "../api/formbot";
import { isLength } from "validator";
import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { fetchFormbotAsync, selectFormbot } from "../store/formbot-slice";

const bubbles = ["text", "image", "video", "gif"];

const inputs = ["text", "number", "email", "phone", "date", "rating", "button"];

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

  const handleSave = async () => {
    const data = {
      name: formName,
      messages,
      theme,
      folder,
    };

    if (id === "new") {
      await createFormbot(data);
    } else {
      await updateFormbot(data, id);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Form Name"
        value={formName}
        onChange={(event) => setFormName(event.target.value)}
      />
      <button onClick={handleSave}>save</button>

      <h2>bubbles</h2>
      <ul>
        {bubbles.map((valueType) => (
          <li key={"bubble-" + valueType}>
            <button
              onClick={() =>
                handleAddMessage({ type: "bubble", valueType: valueType })
              }
            >
              {valueType}
            </button>
          </li>
        ))}
      </ul>

      <h2>inputs</h2>
      <ul>
        {inputs.map((valueType) => (
          <li key={"input-" + valueType}>
            <button
              onClick={() =>
                handleAddMessage({ type: "input", valueType: valueType })
              }
            >
              {valueType}
            </button>
          </li>
        ))}
      </ul>

      <div>
        <h2>messages</h2>
        <ul>
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
  );
}
