import { RouterProvider } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";

import "./global.css";
import { router } from "./routes";
export function App() {
  return (
    <HelmetProvider>
      <Toaster position="bottom-center" richColors />
      <Helmet titleTemplate="%s | Pizza" />
      <RouterProvider router={router} />;
    </HelmetProvider>
  );
}
