'use strict';

const React = require('react');

const defaultTheme = require('../../app/style/themes/default-theme');
const ThemeManager = require('material-ui/lib/styles/theme-manager');
const themeManager = new ThemeManager();
themeManager.setTheme(defaultTheme);

const compWithContext = (Component) => {
  class CompWithContext extends React.Component {
    getChildContext() {
      return {
        muiTheme: themeManager.getCurrentTheme()
      };
    }

    render() {
      return React.createElement(Component, this.props);
    }
  }

  CompWithContext.childContextTypes = {
    muiTheme: React.PropTypes.object
  };

  return CompWithContext;
};

module.exports = compWithContext;
