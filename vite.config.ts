import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import jotaiDebugLabel from "jotai/babel/plugin-debug-label";
import jotaiReactRefresh from "jotai/babel/plugin-react-refresh";
import preGitPlugin from "./rollup-plugin/rollup-plugin-pregit";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({ babel: { plugins: [jotaiDebugLabel, jotaiReactRefresh] } }),
    preGitPlugin({
      staticDir: 'icons',
      giturl:"https://github.com/kitUIN/WindowsIconCustomization"
    }),
  ],
  server: {
    host: "0.0.0.0",
  },
  resolve: {
    alias: {
      "@": "/src",
      "@rollup-plugin": "/rollup-plugin",
    },
  },
});
