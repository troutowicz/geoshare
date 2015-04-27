const React = require('react');
const AltContainer = require('alt/AltContainer');
const App = require('./App');
const AppActions = require('../actions/AppActions');
const AppStore = require('../stores/AppStore');

const alt = require('../alt');

class MyAltContainer extends React.Component {
  componentWillMount() {
    if (this.props.altStores) {
      alt.bootstrap(JSON.stringify(this.props.altStores));

      // force state update this render cycle
      this.setState(AppStore.getState());
    }
  }

  render() {
    return (
      <AltContainer store={AppStore} actions={AppActions} >
        <App />
      </AltContainer>
    );
  }
}

module.exports = MyAltContainer;
