/// <binding BeforeBuild='Run - Development' />
"use strict";
const webpack = require('webpack');

module.exports = {
    entry: {
        layout: "./scripts/jsx/layoutEntry.jsx",
    },
    output: {
        filename: "./public/javascripts/[Name].js"
    },
    devServer: {
        contentBase: ".",
        host: "localhost",
        port: 9000
    },
    module: {
        loaders: [
          { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
          { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
    },
    externals:[{
    xmlhttprequest: '{XMLHttpRequest:XMLHttpRequest}'
}],
};