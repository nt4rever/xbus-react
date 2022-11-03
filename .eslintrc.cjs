module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "no-console": "warn",
    "react/prop-types": "off",
    "react/self-closing-comp": "warn",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
