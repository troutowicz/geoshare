'use strict';

const isBrowser = typeof window !== 'undefined';
// TODO how to handle the es6 way?
const Map = isBrowser ? require('./Map'): undefined;

import React from 'react';
import InjectTapEventPlugin from 'react-tap-event-plugin';
import List from './List';
import Snackbar from 'material-ui/lib/snackbar';
import TopBar from './TopBar';
import io from 'socket.io-client';

if (isBrowser) {
  var socket = io();
}

new InjectTapEventPlugin();

class App extends React.Component {
  componentDidMount() {
    socket.on('data:add', this._onNewData.bind(this));
    socket.on('data:timeout', this._onDataTimeout.bind(this));
  }

  _getStyles() {
    return {
      root: {
        fontFamily: this.context.muiTheme.contentFontFamily,
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
    };
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
    let styles = this._getStyles();
    // cant be executing client side js on prerender
    let map, alert;

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
      <div style={styles.root} id='app-container'>
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
          style={styles.list}
        />
      </div>
    );
  }
}

App.contextTypes = {
  muiTheme: React.PropTypes.object
};

export default App;
