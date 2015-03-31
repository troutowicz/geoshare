'use strict';

const alt = require('../alt');
const AppActions = require('../actions/AppActions');

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

  onData(data) {
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

  onFocusMarker(marker) {
    this.focusMarker = marker;
  }

  onFlowSuccess(newFlow) {
    this.flow = newFlow;
  }

  onTimeout(isActive) {
    this.timeout = isActive;
  }
}

module.exports = alt.createStore(AppStore, 'AppStore');
