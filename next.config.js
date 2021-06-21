const webpack = require("webpack");

const { parsed: myEnv } = require("dotenv").config({
  path: "./.env",
});

module.exports = {
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(myEnv));
    return config;
  },
};

module.exports = {
  env: {
    NEXT_BASE_URL: "https://stagio-backend.herokuapp.com/",
  },
};
