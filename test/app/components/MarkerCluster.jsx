'use strict';

const React = require('react/addons');
const TestUtils = React.addons.TestUtils;

const assert = require('chai').assert;

const { Map } = require('react-leaflet');
const MyMap = require('../../../app/components/Map');
const MarkerCluster = require('../../../app/components/MarkerCluster');

describe('MarkerCluster component', function () {
  it('should add a marker for every property in newMarkerData property', function () {
    const data = [
      {
        id: 0,
        latlng: [0, 0]
      },
      {
        id: 1,
        latlng: [1, 1]
      }
    ];

    const component = React.render(
      <MyMap newMarkerData={data} />,
      document.body
    );

    const cluster = TestUtils.findRenderedComponentWithType(component, MarkerCluster).leafletElement;
    assert.lengthOf(cluster.getLayers(), 2);
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
