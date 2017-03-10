/// <binding BeforeBuild='Run - Development' />
"use strict";
const webpack = require('webpack');

module.exports = {
    entry: {
        playerApp: ["./scripts/jsx/playerAppEntry.jsx","./scripts/playerProfileWebAPI.js"],
        layout: "./scripts/jsx/layoutEntry.jsx",
        test: "./scripts/testEntry.js"
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