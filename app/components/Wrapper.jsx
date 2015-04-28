'use strict';

const React = require('react');
const AltContainer = require('alt/AltContainer');
const AppActions = require('../actions/AppActions');
const AppStore = require('../stores/AppStore');
const App = require('./App');
const alt = require('../alt');

const defaultTheme = require('../style/themes/default-theme');
const ThemeManager = require('material-ui').Styles.ThemeManager;
const themeManager = new ThemeManager();
themeManager.setTheme(defaultTheme);

require('../style/app.less');

class Wrapper extends React.Component {
  getChildContext() {
    return Object.assign(
      {}, this.props.initData.ctx, { muiTheme: themeManager.getCurrentTheme() }
    );
  }

  componentWillMount() {
    alt.bootstrap(JSON.stringify(this.props.initData.state));

    // force state update this render cycle
    this.setState(AppStore.getState());
  }

  render() {
    return (
      <AltContainer store={AppStore} actions={AppActions} >
        <App />
      </AltContainer>
    );
  }
}

Wrapper.childContextTypes = {
  tag: React.PropTypes.string.isRequired,
  loggedIn: React.PropTypes.bool.isRequired,
  muiTheme: React.PropTypes.object,
  repoUrl: React.PropTypes.string.isRequired
};

Wrapper.PropTypes = {
  initData: React.PropTypes.object.isRequired
};

module.exports = Wrapper;
