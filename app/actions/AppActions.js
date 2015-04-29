'use strict';

const isBrowser = typeof window !== 'undefined';

const alt = require('../alt');
const socket = isBrowser ? require('socket.io-client')() : undefined;

class AppActions {
  constructor() {
    this.generateActions(
      'updateFocusedMarker',
      'updateFlowSuccess',
      'updateInstaData',
      'updateMarkers',
      'updateTimeout'
    );
  }

  updateFlow(curFlow) {
    if (curFlow === 'Pause') {
      socket.emit('flow:pause', () => this.actions.updateFlowSuccess('Resume'));
    } else {
      socket.emit('flow:start', () => this.actions.updateFlowSuccess('Pause'));
    }
  }
}

module.exports = alt.createActions(AppActions);
