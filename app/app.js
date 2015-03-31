'use strict';

const React = require('react');
const Iso = require('iso');
const getAppWithContext = require('./utils/getAppWithContext');

Iso.on('react', true, function (initData, _, node) {
  React.render(React.createElement(getAppWithContext(initData)), node);
});
