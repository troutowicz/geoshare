import stampit from 'react-stampit';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';

import markerClusterFactory from './MarkerCluster';

export default React => {
  const MarkerCluster = markerClusterFactory(React);

  return stampit(React, {
    displayName: 'GeoMap',

    propTypes: {
      attribution: React.PropTypes.string,
      center: React.PropTypes.array,
      focusMarker: React.PropTypes.object,
      markers: React.PropTypes.object,
      maxZoom: React.PropTypes.number,
      minZoom: React.PropTypes.number,
      newMarkerData: React.PropTypes.array,
      style: React.PropTypes.object,
      updateMarkers: React.PropTypes.func,
      url: React.PropTypes.string,
      zoom: React.PropTypes.number,
    },

    defaultProps: {
      attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      center: [0, 0],
      maxZoom: 16,
      minZoom: 3,
      style: {},
      url: 'http://openmapsurfer.uni-hd.de/tiles/roadsg/x={x}&y={y}&z={z}',
      zoom: 3,
    },

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
    },
  });
};
