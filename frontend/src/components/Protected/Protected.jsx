import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { selectAuthUser } from "../../store/auth-slice";

export default function Protected({ children }) {
  const user = useSelector(selectAuthUser);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}
