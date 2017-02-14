let path = require('path');
let webpack = require('webpack');

module.exports = {
    entry: {
        index: __dirname + '/src/index.js'
    },

    output: {
        path: path.resolve(__dirname, 'revenue/static/js'),
        filename: 'bundle.js'
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    }
};