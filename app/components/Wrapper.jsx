'use strict';

const React = require('react');
const AltContainer = require('alt/AltContainer');
const AppActions = require('../actions/AppActions');
const AppStore = require('../stores/AppStore');
const App = require('./App');

const alt = require('../alt');

class Wrapper extends React.Component {
  getChildContext() {
    return this.props.initData.ctx;
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
  repoUrl: React.PropTypes.string.isRequired
};

Wrapper.PropTypes = {
  initData: React.PropTypes.object.isRequired
};

module.exports = Wrapper;
