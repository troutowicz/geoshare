'use strict';

import React from 'react';
import theme from '../../app/style/themes/default-theme';
import ThemeManager from 'material-ui/lib/styles/theme-manager';

const themeManager = new ThemeManager();
themeManager.setTheme(theme);

export default (Component) => {
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
