import { RouterProvider } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";

import "./global.css";
import { router } from "./routes";
import { ThemeProvider } from "./components/Theme/Theme-Provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/react-query";
export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="dark" storageKey="pizzashop-theme">
        <Toaster position="bottom-center" richColors />
        <Helmet titleTemplate="%s | Pizza" />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />;
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}
