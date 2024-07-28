import { useEffect, useState } from "react";

import { fetchFormbotResponses } from "../api/formbot";
import classes from "./Response.module.css";

export default function Response({ id }) {
  const [messages, setMessages] = useState([]);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetchFormbotResponses(id);
      setMessages(response.data.data.messages);

      setResponses(response.data.data.responses);
    })();
  }, [id]);

  console.log({ hello: responses });

  const responsesFormatted = responses.map((response) => {
    const obj = {
      _id: response._id,
      createdAt: new Date(response.createdAt).toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };

    response.responses.forEach(
      (r) => (obj[r.question] = { response: r.response, _id: r._id })
    );

    return obj;
  });

  console.log({ responsesFormatted });

  // return <>work in progress</>;

  return (
    <div className={classes.main}>
      <table className={classes.table}>
        <thead>
          <th></th>
          <th>Submitted at</th>
          {messages.map((message) => (
            <th key={message._id}>{message.valueType}</th>
          ))}
        </thead>

        <tbody>
          {responsesFormatted.map((response, idx) => (
            <tr key={response._id}>
              <td>{idx + 1}</td>
              <td>{response.createdAt}</td>
              {messages.map((message) => {
                const responseToMessage = response[message._id];

                return (
                  <td key={responseToMessage._id}>
                    {responseToMessage.response}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
