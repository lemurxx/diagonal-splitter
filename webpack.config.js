const { CheckerPlugin } = require('awesome-typescript-loader');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
    externals: {
        jquery: 'jQuery'
    },
    devtool: 'source-map',
    entry: {
        'diagonal-splitter': './src/diagonal-splitter.ts'
    },
    module: {
        rules: [{
            test: /\.ts$/,
            loaders: 'awesome-typescript-loader'
        },
         {
            test: /\.less$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
        }
    ]
    },
    plugins: [
        new CheckerPlugin(),
        new MiniCssExtractPlugin()

    ],
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].bundle.js"

    }
}