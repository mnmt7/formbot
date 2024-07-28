import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchChat, sendResponse } from "../api/chat";

export default function Chat() {
  const { id } = useParams();

  const [messages, setMessages] = useState([]);
  const [response, setResponse] = useState(null);
  const [responseId, setResponseId] = useState(null);
  const [nextMessage, setNextMessage] = useState(null);

  console.log({ messages });

  useEffect(() => {
    (async () => {
      const res = await fetchChat(id);
      setMessages(res.data.data.messages);

      if (res.data.data.response) {
        const responseObj = { ...res.data.data.response, value: "" };
        setResponse(responseObj);
      } else {
        setResponse(null);
      }

      setResponseId(res.data.data.responseId);
      setNextMessage(res.data.data.nextMessage);
    })();
  }, [id]);

  const handleInputChange = (event) => {
    setResponse((prevResponse) => ({
      ...prevResponse,
      value: event.target.value,
    }));
  };

  const handleSendResponse = async () => {
    // todo: validations based on valueType
    const data = {
      response: {
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

  return (
    <>
      <ul>
        {messages.map((message) => (
          <li key={message._id}>
            {message.type === "input" && "user --> "}
            {message.value}
          </li>
        ))}
      </ul>

      {response && (
        <div>
          <input value={response.value} onChange={handleInputChange} />
          <button onClick={handleSendResponse}>send</button>
        </div>
      )}
    </>
  );
}
