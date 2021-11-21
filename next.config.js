/** @type {import('next').NextConfig} */
const path = require("path");
module.exports = {
  reactStrictMode: true,
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "components"),
      "@actions": path.resolve(__dirname, "actions"),
      "@app": path.resolve(__dirname, "app"),
    },
  },
  env: {
    DEV_URL: "http://localhost:5000/",
    PROD_URL: "https://stagio-backend.herokuapp.com/",
  },
};
