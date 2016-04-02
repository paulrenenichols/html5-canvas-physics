var path = require('path');
var webpack = require('webpack');

// node 0.10.xx does not support es6 promises.
// This is a problem because the webpack style loaders need them.
// This polyfill makes the webpack style loaders work in 0.10.xx versions of node.
require('es6-promise').polyfill();

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'webpack-hot-middleware/client',
        './client/index.js'
    ],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel'],
            include: path.join(__dirname, 'client'),
            exclude: /node_modules/
        },
        {
          test: /\.json$/,
          loader: 'json'
        },
        {
          test: /\.less$/,
          loader: 'style!css!less'
        },
        {
          test: /\.(png)$/,
          loader: 'url?limit=100000&mimetype=image/png'
        },
        {
          test: /\.(jpg|gif|svg)$/,
          loader: 'file?name=images/[name].[ext]'
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
          __DEV__: true,
          __PRODUCTION__: false
        })
    ]
};
