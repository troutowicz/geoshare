'use strict';

const React = require('react');

const appWithContext = (App, initData) => {
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

module.exports = appWithContext;
