'use strict';

const isBrowser = typeof window !== 'undefined' ? true : false;

const React = require('react');
const TopBar = require('./TopBar');
const Map = isBrowser ? require('./Map'): undefined;
const List = require('./List');
const { Snackbar } = require('material-ui');
const socket = isBrowser ? require('socket.io-client')() : undefined;

const AppStore = require('../stores/AppStore');
const AppActions = require('../actions/AppActions');
const connectToStores = require('../utils/connectToStores');

const InjectTapEventPlugin = require('react-tap-event-plugin');
new InjectTapEventPlugin();

require('../style/components/app.less');

class App extends React.Component {
  static getStores() {
    return [AppStore];
  }

  static getStateFromStores() {
    return {
      newImageData: AppStore.getState().newImageData,
      imageData: AppStore.getState().imageData,
      markers: AppStore.getState().markers,
      focusMarker: AppStore.getState().focusMarker,
      flow: AppStore.getState().flow,
      timeout: AppStore.getState().timeout
    };
  }

  componentDidMount() {
    socket.on('data:add', this._onDataAdd);
    socket.on('data:timeout', this._onDataTimeout);
  }

  _onDataAdd(data) {
    AppActions.data(data);
  }

  _onDataTimeout(data) {
    AppActions.timeout(data);
  }

  _onListItemClick(item) {
    AppActions.focusMarker(item);
  }

  render() {
    // cant be executing client side js on prerender
    let map, alert;

    if (isBrowser) {
      map = (
        <Map
          markers={this.props.markers}
          focusMarker={this.props.focusMarker}
          newMarkerData={this.props.newImageData}
        />
      );
    }

    if (this.props.timeout) {
      alert = (
        <Snackbar
          openOnMount={true}
          message='All tokens have reached the hourly limit, consider logging in to register a token!'
        />
      );
    }

    return (
      <div id='app-container'>
        <TopBar
          itemCount={Object.keys(this.props.markers).length}
          flow={this.props.flow}
        />
        {map}
        {alert}
        <List
          itemData={this.props.imageData}
          onClick={this._onListItemClick}
        />
      </div>
    );
  }
}

module.exports = connectToStores(App);
