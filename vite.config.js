import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === "production";

  return {
    base: isProd ? "/todo-app/" : "/",
    plugins: [react(), tailwindcss()],
    server: {
      watch: {
        ignored: ["**/db.json5"],
      },
    },
  };
});
