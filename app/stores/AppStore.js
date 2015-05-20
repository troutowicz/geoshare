'use strict';

import alt from '../alt';
import AppActions from '../actions/AppActions';

class AppStore {
  constructor() {
    this.bindActions(AppActions);

    this.newImageData = [];
    this.imageData = [];
    this.markers = {};
    this.focusMarker = {};
    this.flow = 'Pause';
    this.timeout = false;
  }

  onUpdateInstaData(data) {
    let imageData = data.concat(this.imageData);

    // limit imageData (used in list) to last 100
    while (imageData.length > 100) {
      imageData.pop();
    }

    this.focusMarker = {};
    this.newImageData = data;
    this.imageData = imageData;
  }

  onUpdateMarkers(markers) {
    this.newImageData = [];
    this.markers = markers;
  }

  onUpdateFocusedMarker(marker) {
    this.focusMarker = marker;
  }

  onUpdateFlowSuccess(newFlow) {
    this.flow = newFlow;
  }

  onUpdateTimeout(isActive) {
    this.timeout = isActive;
  }
}

export default alt.createStore(AppStore, 'AppStore');
