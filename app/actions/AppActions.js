import alt from '../alt';
import io from 'socket.io-client';

let socket;
if (typeof window !== 'undefined') {
  socket = io();
}

export default alt.createActions({
  displayName: 'AppActions',

  updateFocusedMarker(data) {
    this.dispatch(data);
  },

  updateFlowSuccess(data) {
    this.dispatch(data);
  },

  updateInstaData(data) {
    this.dispatch(data);
  },

  updateMarkers(data) {
    this.dispatch(data);
  },

  updateTimeout(data) {
    this.dispatch(data);
  },

  updateFlow(curFlow) {
    if (curFlow === 'Pause') {
      socket.emit('flow:pause', () => this.actions.updateFlowSuccess('Resume'));
    } else {
      socket.emit('flow:start', () => this.actions.updateFlowSuccess('Pause'));
    }
  },
});
