import alt from '../alt';
import AppActions from '../actions/AppActions';

export default alt.createStore({
  state: {
    newImageData: [],
    imageData: [],
    markers: {},
    focusMarker: {},
    flow: 'Pause',
    timeout: false,
  },

  bindListeners: {
    onUpdateInstaData: AppActions.updateInstaData,
    onUpdateMarkers: AppActions.updateMarkers,
    onUpdateFocusedMarker: AppActions.updateFocusedMarker,
    onUpdateFlowSuccess: AppActions.updateFlowSuccess,
    onUpdateTimeout: AppActions.updateTimeout,
  },

  onUpdateInstaData(data) {
    let imageData = data.concat(this.state.imageData);

    // limit imageData (used in list) to last 100
    while (imageData.length > 100) {
      imageData.pop();
    }

    this.state.focusMarker = {};
    this.state.newImageData = data;
    this.state.imageData = imageData;
  },

  onUpdateMarkers(markers) {
    this.state.newImageData = [];
    this.state.markers = markers;
  },

  onUpdateFocusedMarker(marker) {
    this.state.focusMarker = marker;
  },

  onUpdateFlowSuccess(newFlow) {
    this.state.flow = newFlow;
  },

  onUpdateTimeout(isActive) {
    this.state.timeout = isActive;
  },
}, 'AppStore');
