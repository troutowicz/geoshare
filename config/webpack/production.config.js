'use strict';

module.exports = [
  require('./makeConfig')({
    longTermCaching: true,
    separateStylesheet: true,
    minimize: true,
    // devtool: 'source-map',
  }),
  require('./makeConfig')({
    prerender: true,
  })
];
