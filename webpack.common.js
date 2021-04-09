const path = require("path");

const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");

module.exports = {
    stats: {
        children: true
    },

    entry: {
        index: "./src/index.ts"
    },
    output: {
        filename: "[contenthash].js",
        path: path.resolve(__dirname, "dist")
    },
    optimization: {
        splitChunks: {
            chunks: "all",
        },
        moduleIds: "deterministic"
    },
    resolve: {
        extensions: [
            ".ts", ".tsx",
            ".js",
            ".css", ".scss"
        ]
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-modules-typescript-loader"
                    },
                    {
                        loader: MiniCSSExtractPlugin.loader,
                        options: {
                            esModule: false
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: false,
                            sourceMap: false
                        }
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: "ts-loader"
            },
            {
                test: /\.pug$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "html-loader"
                    },
                    {
                        loader: "pug-html-loader"
                    }
                ]
            },
            {
                test: /\.(gif|png|jpe?g}svg)$/i,
                exclude: /node_modules/, // no idea why there would be image files there, but just incase
                type: "asset/resource",
            }
        ]
    },
    
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "src/assets/icons/",
                    to: ""
                }
            ]
        }),
        new MiniCSSExtractPlugin({
            filename: "[contenthash].css"
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "src/templates/index.pug",
            chunks: ["index"]
        }),
        new CleanWebpackPlugin()
    ]
}