'use strict';

const React = require('react');
const { Map, TileLayer } = require('react-leaflet');
const MarkerCluster = require('./MarkerCluster');

module.exports = React.createClass ({
  propTypes: {
    center: React.PropTypes.array,
    zoom: React.PropTypes.number,
    minZoom: React.PropTypes.number,
    maxZoom: React.PropTypes.number,
    url: React.PropTypes.string,
    attribution: React.PropTypes.string,
    markers: React.PropTypes.object,
    newMarkerData: React.PropTypes.array,
    focusMarker: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      center: [0, 0],
      zoom: 3,
      minZoom: 3,
      maxZoom: 16,
      url: 'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    };
  },

  render() {
    return (
      <Map center={this.props.center} zoom={this.props.zoom} >
        <TileLayer
          minZoom={this.props.minZoom}
          maxZoom={this.props.maxZoom}
          url={this.props.url}
          attribution={this.props.attribution}
        />
        <MarkerCluster
          markers={this.props.markers}
          newMarkerData={this.props.newMarkerData}
          focusMarker={this.props.focusMarker}
        />
      </Map>
    );
  }
});
