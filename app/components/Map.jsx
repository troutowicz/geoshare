'use strict';

const React = require('react');
const LeafletMap = require('react-leaflet').Map;
const MarkerCluster = require('./MarkerCluster');
const TileLayer = require('react-leaflet').TileLayer;

class Map extends React.Component {
  render() {
    return (
      <LeafletMap
        center={this.props.center}
        style={this.props.style}
        zoom={this.props.zoom}
      >
        <TileLayer
          attribution={this.props.attribution}
          maxZoom={this.props.maxZoom}
          minZoom={this.props.minZoom}
          url={this.props.url}
        />
        <MarkerCluster
          focusMarker={this.props.focusMarker}
          markers={this.props.markers}
          newMarkerData={this.props.newMarkerData}
          updateMarkers={this.props.updateMarkers}
        />
      </LeafletMap>
    );
  }
}

Map.propTypes = {
  attribution: React.PropTypes.string,
  center: React.PropTypes.array,
  focusMarker: React.PropTypes.object,
  markers: React.PropTypes.object,
  maxZoom: React.PropTypes.number,
  minZoom: React.PropTypes.number,
  newMarkerData: React.PropTypes.array,
  style: React.PropTypes.object,
  url: React.PropTypes.string,
  zoom: React.PropTypes.number
};

Map.defaultProps = {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  center: [0, 0],
  maxZoom: 16,
  minZoom: 3,
  style: {},
  url: 'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
  zoom: 3
};

module.exports = Map;
