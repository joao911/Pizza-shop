import { RouterProvider } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

import "./global.css";
import { router } from "./routes";
export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | Pizza" />
      <RouterProvider router={router} />;
    </HelmetProvider>
  );
}
