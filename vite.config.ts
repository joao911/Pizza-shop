import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { UserConfig } from "vite";
import { InlineConfig } from "vitest";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    setupFiles: ["./test/setup.ts"],
    environment: "happy-dom",
  },
} as UserConfig & {
  test: InlineConfig;
});
