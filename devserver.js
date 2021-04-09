const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");

const webpackConfig = require("./webpack.dev");

const app = express();

const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler));

const port = process.env.PORT || "8080";
const server = app.listen(port);
console.log("Devserver started.");