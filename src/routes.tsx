import { createBrowserRouter } from "react-router-dom";
import { SignInLayout } from "./screens/_layouts/SignInLayout";
import { DashBoard } from "./screens/sigIn/DashBoard";
import { SignOutLayout } from "./screens/_layouts/SignOutLayout";
import { Login } from "./screens/signOut/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SignInLayout />,
    children: [
      {
        path: "/",
        element: <DashBoard />,
      },
    ],
  },
  {
    path: "/",
    element: <SignOutLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);
