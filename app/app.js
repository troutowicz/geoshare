'use strict';

require('babel/polyfill');

const React = require('react');
const Iso = require('iso');

const appWithContext = require('./utils/appWithContext');
const App = require('./components/AltContainer');

Iso.on('react', true, function (initData, _, node) {
  React.render(React.createElement(appWithContext(App, initData)), node);
});
