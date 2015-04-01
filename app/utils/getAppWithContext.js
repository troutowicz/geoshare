'use strict';

const React = require('react');
const App = require('../components/App');

const getAppWithContext = (initData) => {
  class AppWithContext extends React.Component {
    getChildContext() {
      return initData.ctx;
    }

    render() {
      return React.createElement(App, { altStores: initData.state });
    }
  }

  AppWithContext.childContextTypes = {
    tag: React.PropTypes.string.isRequired,
    loggedIn: React.PropTypes.bool.isRequired,
    repoUrl: React.PropTypes.string.isRequired
  };

  return AppWithContext;
};

module.exports = getAppWithContext;
