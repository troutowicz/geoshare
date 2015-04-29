'use strict';

const isBrowser = typeof window !== 'undefined';
const socket = isBrowser ? require('socket.io-client')() : undefined;

const React = require('react');
const List = require('./List');
const Map = isBrowser ? require('./Map'): undefined;
const { Snackbar } = require('material-ui');
const TopBar = require('./TopBar');

const InjectTapEventPlugin = require('react-tap-event-plugin');
new InjectTapEventPlugin();

require('../style/components/app.less');

class App extends React.Component {
  componentDidMount() {
    socket.on('data:add', this._onNewData.bind(this));
    socket.on('data:timeout', this._onDataTimeout.bind(this));
  }

  _onNewData(data) {
    this.props.updateInstaData(data);
  }

  _onDataTimeout(data) {
    this.props.updateTimeout(data);
  }

  _onListItemClick(item) {
    this.props.updateFocusedMarker(item);
  }

  render() {
    // cant be executing client side js on prerender
    let map, alert;

    if (isBrowser) {
      map = (
        <Map
          focusMarker={this.props.focusMarker}
          markers={this.props.markers}
          newMarkerData={this.props.newImageData}
          updateMarkers={this.props.updateMarkers}
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
          flow={this.props.flow}
          itemCount={Object.keys(this.props.markers).length}
          updateFlow={this.props.updateFlow}
        />
        {map}
        {alert}
        <List
          itemData={this.props.imageData}
          onClick={this._onListItemClick.bind(this)}
        />
      </div>
    );
  }
}

module.exports = App;
