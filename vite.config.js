import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "@rollup/plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      ...eslint({ include: "src/**/*.+(js|jsx|ts|tsx)" }),
      enforce: "pre",
    },
  ],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          "primary-color": "#749F82",
        },
        javascriptEnabled: true,
      },
    },
  },
});
