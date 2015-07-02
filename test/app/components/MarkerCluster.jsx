import React from 'react/addons';
import { assert } from 'chai';

import markerClusterFactory from '../../../app/components/MarkerCluster';
import mapFactory from '../../../app/components/Map';
// import { Map } from 'react-leaflet';

const MarkerCluster = markerClusterFactory(React);
const MyMap = mapFactory(React);
const TestUtils = React.addons.TestUtils;

describe('MarkerCluster component', function () {
  it('should add a marker for every property in newMarkerData property', function () {
    const data = [
      {
        id: 0,
        latLng: [0, 0],
      },
      {
        id: 1,
        latLng: [1, 1],
      },
    ];

    const component = React.render(
      <MyMap newMarkerData={data} updateMarkers={() => {}}/>,
      document.body
    );
    const cluster = TestUtils.findRenderedComponentWithType(component, MarkerCluster).leafletElement;

    assert.lengthOf(cluster.getLayers(), Object.keys(data).length);
  });

  /*
  it('should focus on a marker using focusMarker property', function () {
    const data = {
      id: 0,
      latlng: [1, 1]
    };

    const component = React.render(
      <MyMap markerData={[data]} focusMarker={data} />,
      document.body
    );

    const mapLeaflet = TestUtils.findRenderedComponentWithType(component, Map).getLeafletElement();
    console.log(mapLeaflet.getCenter());
  });
  */
});
