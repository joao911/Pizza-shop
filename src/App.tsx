import { RouterProvider } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";

import "./global.css";
import { router } from "./routes";
import { ThemeProvider } from "./components/Theme/Theme-Provider";
export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="dark" storageKey="pizzashop-theme">
        <Toaster position="bottom-center" richColors />
        <Helmet titleTemplate="%s | Pizza" />
        <RouterProvider router={router} />;
      </ThemeProvider>
    </HelmetProvider>
  );
}
