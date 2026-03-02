import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import plugin from "@vitejs/plugin-react";
import { env } from "process";
import tailwindcss from "@tailwindcss/vite";

const target = env.ASPNETCORE_URLS
  ? (env.ASPNETCORE_URLS.split(";").find((url) => url.startsWith("http://")) ??
    "http://localhost:5170")
  : "http://localhost:5170";

export default defineConfig({
  plugins: [plugin(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "^/api": {
        target,
        secure: false,
      },
    },
    port: 5173,
  },
});
