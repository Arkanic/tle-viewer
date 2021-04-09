const merge = require("webpack-merge");
const common = require("./webpack.common");

const TerserJSPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = merge.merge(common, {
    mode: "production",
    optimization: {
        minimizer: [
            new TerserJSPlugin({}),
            new CssMinimizerPlugin()
        ]
    }
});