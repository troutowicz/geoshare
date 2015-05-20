'use strict';

import alt from '../alt';
import io from 'socket.io-client';

if (typeof window !== 'undefined') {
  var socket = io();
}

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

export default alt.createActions(AppActions);
