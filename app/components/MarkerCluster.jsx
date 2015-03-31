'use strict';

const React = require('react');
const Leaflet = require('leaflet');
const MapLayer = require('react-leaflet/lib/MapLayer');
const assign = require('object.assign');
require('leaflet.markercluster');

const AppActions = require('../actions/AppActions');

class MarkerCluster extends MapLayer {
  componentWillMount() {
    super.componentWillMount();

    this.leafletElement = Leaflet.markerClusterGroup();
  }

  componentWillReceiveProps(nextProps) {
    super.componentWillReceiveProps(nextProps);

    // add markers to cluster layer
    if (nextProps.newMarkerData.length > 0) {
      let markers = assign({}, this.props.markers);
      let newMarkers = [];

      nextProps.newMarkerData.forEach((obj) => {
        let leafletMarker = Leaflet.marker(obj.latlng)
          .bindPopup(obj.marker_popup)
          .on('click', () => this.props.map.panTo(obj.latlng));

        markers[obj.id] = leafletMarker;
        newMarkers.push(leafletMarker);
      });

      this.leafletElement.addLayers(newMarkers);

      setTimeout(() => {
        AppActions.updateMarkers(markers);
      }, 0);
    }

    // zoom to particular marker
    if (Object.keys(nextProps.focusMarker).length > 0) {
      let marker = this.props.markers[nextProps.focusMarker.id];

      this.leafletElement.zoomToShowLayer(marker, () => {
        this.props.map.panTo(nextProps.focusMarker.latlng);
        marker.openPopup();
      });
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return null;
  }
}

MarkerCluster.propTypes = {
  markers: React.PropTypes.object,
  newMarkerData: React.PropTypes.array,
  focusMarker: React.PropTypes.object
};

MarkerCluster.defaultProps = {
  markers: {},
  newMarkerData: [],
  focusMarker: {}
};

module.exports = MarkerCluster;
