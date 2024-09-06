import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { fetchFormbotResponses } from "../../api/formbot";
import classes from "./Response.module.css";
import formatDate from "../../utils/formatDate";
import Skeleton from "../Skeleton/Skeleton";

export default function Response({ id }) {
  const [messages, setMessages] = useState([]);
  const [responses, setResponses] = useState([]);
  const [views, setViews] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  const starts = responses.length;
  const completionRate = Math.round((starts / views) * 100);

  useEffect(() => {
    if (id === "new") {
      return;
    }

    (async () => {
      try {
        setIsFetching(true);
        const response = await fetchFormbotResponses(id);
        setMessages(response.data.data.messages);

        setResponses(response.data.data.responses);

        setViews(response.data.data.views);
      } catch (err) {
        toast(err.message);
      } finally {
        setIsFetching(false);
      }
    })();
  }, [id]);

  if (isFetching) {
    return (
      <div className={classes.main}>
        <ul className={classes.stats}>
          <Skeleton count={3} height={77} width={130} />
        </ul>

        <div className={classes.skeletonContainer}>
          <Skeleton count={1} height={500} width={700} />
        </div>
      </div>
    );
  }

  if (responses.length === 0) {
    return (
      <div className={classes.main}>
        <p className={classes.noResponse}>No Response yet collected</p>
      </div>
    );
  }

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

  return (
    <div className={classes.main}>
      <ul className={classes.stats}>
        <li className={classes.stat}>
          <div className={classes.statTxt}>Views</div>
          <div className={classes.statVal}>{views}</div>
        </li>

        <li className={classes.stat}>
          <div className={classes.statTxt}>Starts</div>
          <div className={classes.statVal}>{starts}</div>
        </li>

        <li className={classes.stat}>
          <div className={classes.statTxt}>Completion Rate</div>
          <div className={classes.statVal}>{completionRate}%</div>
        </li>
      </ul>

      <div className={classes.container}>
        <table className={classes.table}>
          <thead>
            <tr>
              <th></th>
              <th>Submitted at</th>
              {messages.map((message) => (
                <th key={message._id}>{message.valueType}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {responsesFormatted.map((response, idx) => (
              <tr key={response._id}>
                <td>{idx + 1}</td>
                <td>{response.createdAt}</td>
                {messages.map((message) => {
                  let responseToMessage = response[message._id];

                  if (!responseToMessage) {
                    return <td></td>;
                  }

                  if (message.valueType === "date") {
                    responseToMessage.response = formatDate(
                      new Date(responseToMessage.response)
                    );
                  }

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
    </div>
  );
}
