'use strict';

var path = require('path');
var Webpack = require('webpack');
var fs = require('fs');
var config = require('config');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var loadersByExtension = require('./loadersByExtension');

var host = config.get('Web.host');
var port = config.get('Web.webpack_port');

module.exports = function (options) {
  var entry = path.join(__dirname, '..', '..', 'app', options.prerender ? 'utils/prerender' : 'app');

  var publicPath = options.devServer ?
    'http://' + host + ':' + port + '/public/' :
    '/public/';

  var output = {
    path: path.join(__dirname, '..', '..', 'build', options.prerender ? 'prerender' : 'public'),
    filename: '[name].js' + (options.longTermCaching && !options.prerender ? '?[chunkhash]' : ''),
    chunkFilename: (options.devServer ? '[id].js' : '[name].js') + (options.longTermCaching && !options.prerender ? '?[chunkhash]' : ''),
    sourceMapFilename: 'debugging/[file].map',
    publicPath: publicPath,
    pathinfo: options.debug,
    libraryTarget: options.prerender ? 'commonjs2' : undefined
  };

  var loaders = {
    jsx: options.hotComponents ? ['react-hot-loader', 'babel-loader'] : 'babel-loader',
    png: 'url-loader?limit=10000',
    html: 'html-loader'
  };

  var stylesheetLoaders = {
    css: 'css-loader!autoprefixer-loader',
    less: 'css-loader!autoprefixer-loader!less-loader'
  };

  var additionalLoaders = [
    { test: /app\/.*\.js$/, loader: 'babel-loader' }
  ];

  var externals = [];
  var root = path.join(__dirname, '..', '..', 'app', 'components');
  var modulesDirectories = ['web_modules', 'node_modules'];
  var extensions = ['', '.js', '.jsx'];

  var excludeFromStats = [
    /node_modules[\\\/]react[\\\/]/
  ];

  var plugins = [
    function () {
      if (!options.prerender) {
        this.plugin('done', function(stats) {
          var jsonStats = stats.toJson({
            chunkModules: true,
            exclude: excludeFromStats
          });

          jsonStats.publicPath = publicPath;

          fs.writeFileSync(path.join(__dirname, '..', '..', 'build', 'stats.json'), JSON.stringify(jsonStats));
        });
      }
    },
    new Webpack.PrefetchPlugin('react'),
    new Webpack.PrefetchPlugin('react/lib/ReactComponentBrowserEnvironment')
  ];

  if (options.prerender) {
    externals.push(
      /^react(\/.*)?$/
    );

    plugins.push(new Webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }));
  }

  Object.keys(stylesheetLoaders).forEach(function(ext) {
    var loaders = stylesheetLoaders[ext];

    if (Array.isArray(loaders)) {
          loaders = loaders.join('!');
        }

    if (options.prerender) {
      stylesheetLoaders[ext] = 'null-loader';
    } else if (options.separateStylesheet) {
      stylesheetLoaders[ext] = ExtractTextPlugin.extract('style-loader', loaders);
    } else {
      stylesheetLoaders[ext] = 'style-loader!' + loaders;
    }
  });

  if (options.separateStylesheet && !options.prerender) {
    plugins.push(new ExtractTextPlugin('[name].css' + (options.longTermCaching ? '?[contenthash]' : '')));
  }

  if (options.minimize) {
    plugins.push(
      new Webpack.optimize.UglifyJsPlugin(),
      new Webpack.optimize.DedupePlugin(),
      new Webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new Webpack.NoErrorsPlugin()
    );
  }

  return {
    entry: entry,
    output: output,
    target: options.prerender ? 'node' : 'web',
    module: {
      loaders: loadersByExtension(loaders).concat(loadersByExtension(stylesheetLoaders)).concat(additionalLoaders)
    },
    devtool: options.devtool,
    debug: options.debug,
    resolveLoader: {
      root: path.join(__dirname, '..', '..', 'node_modules')
    },
    externals: externals,
    resolve: {
      root: root,
      modulesDirectories: modulesDirectories,
      extensions: extensions
    },
    plugins: plugins,
    devServer: {
      host: host,
      port: port,
      stats: {
        exclude: excludeFromStats
      }
    }
  };
};
