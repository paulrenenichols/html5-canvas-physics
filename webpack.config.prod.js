var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
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
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
        __DEV__: false,
        __PRODUCTION__: true
      }),
      new webpack.optimize.UglifyJsPlugin({minimize: true})
    ]
};
