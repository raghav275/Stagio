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
      "@utils": path.resolve(__dirname, "utils"),
    },
  },
  env: {
    BASE_URL: process.env.BASE_URL,
    RZP_KEY: process.env.RZP_KEY,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  },
  images: {
    domains: ["ik.imagekit.io", "rzp.io"],
  },
};
