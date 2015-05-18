'use strict';

const isBrowser = typeof window !== 'undefined';
const socket = isBrowser ? require('socket.io-client')() : undefined;

const React = require('react');
const List = require('./List');
const Map = isBrowser ? require('./Map'): undefined;
const Snackbar = require('material-ui/lib/snackbar');
const TopBar = require('./TopBar');
const StyleSheet = require('react-style');

const InjectTapEventPlugin = require('react-tap-event-plugin');
new InjectTapEventPlugin();

const styles = StyleSheet.create({
  root: {
    fontSize: '13px',
    lineHeight: '20px',
    'WebkitFontSmoothing': 'antialiased'
  },
  list: {
    position: 'absolute',
    top: '56px',
    bottom: '0',
    right: '0',
    width: '290px',
    overflow: 'hidden',
    overflowY: 'scroll'
  },
  map: {
    position: 'absolute',
    top: '56px',
    bottom: '0',
    left: '0',
    right: '290px'
  }
});

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
    const themeStyles = {
      root: {
        fontFamily: this.context.muiTheme.contentFontFamily
      }
    };

    if (isBrowser) {
      map = (
        <Map
          focusMarker={this.props.focusMarker}
          markers={this.props.markers}
          newMarkerData={this.props.newImageData}
          style={styles.map}
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
      <div styles={[styles.root, themeStyles.root]} id='app-container'>
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
          styles={styles.list}
        />
      </div>
    );
  }
}

App.contextTypes = {
  muiTheme: React.PropTypes.object
};

module.exports = App;
