import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Workspace from "./pages/Workspace/Workspace";
import { checkAuthAsync } from "./store/auth-slice";
import Protected from "./components/Protected/Protected";
import Settings from "./pages/Settings/Settings";
import Formbot from "./pages/Formbot/Formbot";
import Chat from "./pages/Chat/Chat";

const router = createBrowserRouter([
  {
    path: "/",
    // errorElement: <>error</>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "workspace",
        element: (
          <Protected>
            <Workspace />
          </Protected>
        ),
      },
      {
        path: "settings",
        element: (
          <Protected>
            <Settings />
          </Protected>
        ),
      },
      {
        path: "formbot/:id",
        element: (
          <Protected>
            <Formbot />
          </Protected>
        ),
      },
      {
        path: "chat/:id",
        element: <Chat />,
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
