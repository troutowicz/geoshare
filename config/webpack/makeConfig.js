'use strict';

var config = require('config');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var loadersByExtension = require('./loadersByExtension');
var path = require('path');
var StatsPlugin = require('stats-webpack-plugin');
var Webpack = require('webpack');

var host = config.get('Web.host');
var port = config.get('Web.webpack_port');

module.exports = function (options) {
  var entry = path.join(__dirname, '..', '..', 'app', options.prerender ? 'utils/prerender' : 'app');

  var loaders = {
    jsx: options.hotComponents ? ['react-hot-loader', 'babel-loader?stage=1'] : 'babel-loader?stage=1',
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
  var modulesDirectories = ['web_modules', 'node_modules'];
  var extensions = ['', '.js', '.jsx'];
  var root = path.join(__dirname, '..', '..', 'app', 'components');

  var publicPath = options.devServer ?
    'http://' + host + ':' + port + '/public/' :
    '/public/';

  var output = {
    path: path.join(__dirname, '..', '..', 'build', options.prerender ? 'prerender' : 'public'),
    publicPath: publicPath,
    filename: '[name].js' + (options.longTermCaching && !options.prerender ? '?[chunkhash]' : ''),
    chunkFilename: (options.devServer ? '[id].js' : '[name].js') + (options.longTermCaching && !options.prerender ? '?[chunkhash]' : ''),
    sourceMapFilename: 'debugging/[file].map',
    libraryTarget: options.prerender ? 'commonjs2' : undefined,
    pathinfo: options.debug || options.prerender,
  };

  var excludeFromStats = [
    /node_modules[\\\/]react[\\\/]/
  ];

  var plugins = [
    new Webpack.PrefetchPlugin('react'),
    new Webpack.PrefetchPlugin('react/lib/ReactComponentBrowserEnvironment')
  ];

  if (options.prerender) {
    plugins.push(new StatsPlugin(path.join(__dirname, '..', '..', 'build', 'stats.prerender.json'), {
      chunkModules: true,
      exclude: excludeFromStats
    }));

    externals.push(
      /^react(\/.*)?$/
    );

    plugins.push(new Webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }));
  } else {
    plugins.push(new StatsPlugin(path.join(__dirname, '..', '..', 'build', 'stats.json'), {
      chunkModules: true,
      exclude: excludeFromStats
    }));
  }

  Object.keys(stylesheetLoaders).forEach(function (ext) {
    var stylesheetLoader = stylesheetLoaders[ext];

    if (Array.isArray(stylesheetLoader)) {
          stylesheetLoader = stylesheetLoader.join('!');
        }

    if (options.prerender) {
      stylesheetLoaders[ext] = stylesheetLoader.replace(/^css-loader/, 'css-loader/locals');
    } else if (options.separateStylesheet) {
      stylesheetLoaders[ext] = ExtractTextPlugin.extract('style-loader', stylesheetLoader);
    } else {
      stylesheetLoaders[ext] = 'style-loader!' + stylesheetLoader;
    }
  });

  if (options.separateStylesheet && !options.prerender) {
    plugins.push(new ExtractTextPlugin('[name].css' + (options.longTermCaching ? '?[contenthash]' : '')));
  }

  if (options.minimize && !options.prerender) {
    plugins.push(
      new Webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      }),
      new Webpack.optimize.DedupePlugin()
    );
  }

  if (options.minimize) {
    plugins.push(
      new Webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
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
        cached: false,
        exclude: excludeFromStats
      }
    }
  };
};
