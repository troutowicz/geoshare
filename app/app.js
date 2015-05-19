'use strict';

require('babel/polyfill');

const React = require('react');
const Iso = require('iso');
const Wrapper = require('./components/Wrapper');

Iso.on('react', true, function (initData, _, node) {
  React.render(React.createElement(Wrapper, { initData }), node);
});
