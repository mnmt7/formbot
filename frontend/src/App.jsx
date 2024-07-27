import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/LoginV2";
import Register from "./pages/Register";
import Workspace from "./pages/Workspace";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthAsync, selectAuthUser } from "./store/auth-slice";
import Protected from "./components/Protected";
import Settings from "./pages/Settings";

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
    ],
  },
]);

function App() {
  const user = useSelector(selectAuthUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);

  // useEffect(() => {
  //   if (user) {
  //     dispatch(fetchFolderAsync(user.rootFolder));
  //   }
  // }, [user, dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
