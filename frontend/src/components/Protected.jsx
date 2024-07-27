import { useSelector } from "react-redux";
import { selectAuthUser } from "../store/auth-slice";
import { Navigate } from "react-router-dom";

export default function Protected({ children }) {
  const user = useSelector(selectAuthUser);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}
