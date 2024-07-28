import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Response() {
  const { id } = useParams();

  useEffect(() => {}, [id]);
  return <>response</>;
}
