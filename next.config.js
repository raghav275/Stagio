/** @type {import('next').NextConfig} */
const path = require("path");
module.exports = {
  reactStrictMode: true,
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "components"),
      "@typings": path.resolve(__dirname, "typings"),
      "@actions": path.resolve(__dirname, "actions"),
      "@app": path.resolve(__dirname, "app"),
    },
  },
  env: {
    BASE_URL: process.env.BASE_URL,
    RZP_KEY:process.env.RZP_KEY
  },
};
