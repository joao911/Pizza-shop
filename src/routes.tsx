import { createBrowserRouter } from "react-router-dom";
import { SignInLayout } from "./screens/_layouts/SignInLayout";
import { DashBoard } from "./screens/sigIn/DashBoard";
import { SignOutLayout } from "./screens/_layouts/SignOutLayout";
import { Login } from "./screens/signOut/Login";
import { SignUp } from "./screens/signOut/SignUp";
import { Orders } from "./screens/sigIn/Orders";
import { NotFound } from "./screens/404";
import { Error } from "./screens/Error";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SignInLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <DashBoard />,
      },
      {
        path: "/orders",
        element: <Orders />,
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
      {
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
