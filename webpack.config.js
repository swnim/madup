let webpack = require('webpack');

module.exports = {
    entry: {
        index: __dirname + '/client/index.js',
        affiliates: __dirname + '/client/affiliates.js'
    },

    output: {
        path: __dirname + '/server/static/js',
        filename: 'bundle.[name].js'
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