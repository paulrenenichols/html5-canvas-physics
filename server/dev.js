var webpack       = require('webpack');
var webpackConfig = require('./../webpack.config.dev');

module.exports = function(app) {
  var compiler = webpack(webpackConfig);
  app.use(require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler)); 
}
