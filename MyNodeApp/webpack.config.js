/// <binding BeforeBuild='Run - Development' />
"use strict";
const webpack = require('webpack');

module.exports = {
    entry: {
        layout: "./scripts/jsx/appRoutes.jsx",
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
          { test: /\.json$/, loader: 'json-loader' },
          { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
          { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
    },
    node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
    },

    externals:[{
    xmlhttprequest: '{XMLHttpRequest:XMLHttpRequest}'
    }],

};