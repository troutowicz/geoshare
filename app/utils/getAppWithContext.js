'use strict';

const React = require('react');
const App = require('../components/App');

module.exports = (initData) => {
  return React.createClass({
    childContextTypes: {
      tag: React.PropTypes.string.isRequired,
      loggedIn: React.PropTypes.bool.isRequired,
      repoUrl: React.PropTypes.string.isRequired
    },

    getChildContext() {
      return initData.ctx;
    },

    render() {
      return React.createElement(App, { altStores: initData.state });
    }
  });
};
