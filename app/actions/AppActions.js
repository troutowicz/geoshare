'use strict';

const isBrowser = typeof window !== 'undefined' ? true : false;

const alt = require('../alt');
const socket = isBrowser ? require('socket.io-client')() : undefined;

class AppActions {
  constructor() {
    this.generateActions(
      'data',
      'updateMarkers',
      'focusMarker',
      'flowSuccess',
      'timeout'
    );
  }

  flow(curFlow) {
    if (curFlow === 'Pause') {
      socket.emit('flow:pause', () => this.actions.flowSuccess('Resume'));
    } else {
      socket.emit('flow:start', () => this.actions.flowSuccess('Pause'));
    }
  }
}

module.exports = alt.createActions(AppActions);
