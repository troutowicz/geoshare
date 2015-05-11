'use strict';

const React = require('react');
const Leaflet = require('leaflet');
const MapLayer = require('react-leaflet/lib/MapLayer');
const MarkerPopup = require('./MarkerPopup');
require('leaflet.markercluster');

class MarkerCluster extends MapLayer {
  componentWillMount() {
    super.componentWillMount();

    this.leafletElement = Leaflet.markerClusterGroup();
  }

  componentWillReceiveProps(nextProps) {
    super.componentWillReceiveProps(nextProps);

    // add markers to cluster layer
    if (nextProps.newMarkerData.length > 0) {
      let markers = Object.assign({}, this.props.markers);
      let newMarkers = [];

      nextProps.newMarkerData.forEach((obj) => {
        let markerPopup = React.renderToStaticMarkup(
          <MarkerPopup
            caption={obj.caption}
            imgUrl={obj.imgUrl}
            profileUrl={obj.profileUrl}
          />
        );

        let leafletMarker = Leaflet.marker(obj.latlng)
          .bindPopup(markerPopup)
          .on('click', () => this.props.map.panTo(obj.latlng));

        markers[obj.id] = leafletMarker;
        newMarkers.push(leafletMarker);
      });

      this.leafletElement.addLayers(newMarkers);

      setTimeout(() => {
        this.props.updateMarkers(markers);
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
  focusMarker: React.PropTypes.object,
  markers: React.PropTypes.object,
  newMarkerData: React.PropTypes.array,
  updateMarkers: React.PropTypes.func
};

MarkerCluster.defaultProps = {
  markers: {},
  newMarkerData: [],
  focusMarker: {}
};

module.exports = MarkerCluster;
