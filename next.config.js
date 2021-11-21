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
    BASE_URL: process.env.BASE_URL,
  },
};
