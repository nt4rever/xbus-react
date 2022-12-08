import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "@rollup/plugin-eslint";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      ...eslint({ include: "src/**/*.+(js|jsx|ts|tsx)" }),
      enforce: "pre",
    },
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/scss/_variable.scss";`,
      },
    },
  },
});
