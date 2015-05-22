import stampit from 'react-stampit';
import theme from '../../app/style/themes/default-theme';
import themeManager from 'material-ui/lib/styles/theme-manager';

const themeMgr = themeManager();
themeMgr.setTheme(theme);

export default (React, Component) => {
  return stampit(React, {
    childContextTypes: {
      muiTheme: React.PropTypes.object,
    },

    getChildContext() {
      return {
        muiTheme: themeMgr,
      };
    },

    render() {
      return React.createElement(Component, this.props);
    },
  });
};
