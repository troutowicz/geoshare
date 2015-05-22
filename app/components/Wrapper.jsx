import AltContainer from 'alt/AltContainer';
import stampit from 'react-stampit';
import themeManager from 'material-ui/lib/styles/theme-manager';

import alt from '../alt';
import appFactory from './App';
import AppActions from '../actions/AppActions';
import AppStore from '../stores/AppStore';
import theme from '../style/themes/default-theme';

// webpack
require('../style/app.less');

const themeMgr = themeManager();
themeMgr.setTheme(theme);

export default React => {
  const App = appFactory(React);

  return stampit(React, {
    childContextTypes: {
      tag: React.PropTypes.string.isRequired,
      loggedIn: React.PropTypes.bool.isRequired,
      muiTheme: React.PropTypes.object,
      repoUrl: React.PropTypes.string.isRequired,
    },

    propTypes: {
      initData: React.PropTypes.object.isRequired,
    },

    getChildContext() {
      return Object.assign(
        {}, this.props.initData.ctx, { muiTheme: themeMgr }
      );
    },

    componentWillMount() {
      alt.bootstrap(JSON.stringify(this.props.initData.state));

      // force state update this render cycle
      this.setState(AppStore.getState());
    },

    render() {
      return (
        <AltContainer actions={AppActions} store={AppStore} >
          <App />
        </AltContainer>
      );
    },
  });
};
