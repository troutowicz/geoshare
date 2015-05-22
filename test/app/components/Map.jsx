import React from 'react';
import { assert } from 'chai';
import { Map, TileLayer } from 'react-leaflet';

import mapFactory from '../../../app/components/Map';
import markerClusterFactory from '../../../app/components/MarkerCluster';
import TestUtils from '../../utils/testUtils';

const MyMap = mapFactory(React);
const MarkerCluster = markerClusterFactory(React);

describe('Map component', function () {
  it('should be centered at value of center property', function () {
    const center = [0, 0];

    const component = React.render(
      <MyMap center={center} />,
      document.body
    );
    const map = TestUtils.findRenderedComponentWithType(component, Map);

    assert.equal(JSON.stringify(map.props.center), JSON.stringify(center), 'center set');
  });

  it('should be zoomed to value of zoom property', function () {
    const zoom = 3;

    const component = React.render(
      <MyMap zoom={zoom} />,
      document.body
    );
    const map = TestUtils.findRenderedComponentWithType(component, Map);

    assert.equal(map.props.zoom, zoom, 'zoom set');
  });

  it('should embed children components', function () {
    const component = React.render(
      <MyMap />,
      document.body
    );

    assert.ok(TestUtils.findRenderedComponentWithType(component, TileLayer), 'has tile layer');
    assert.ok(TestUtils.findRenderedComponentWithType(component, MarkerCluster), 'has marker cluster layer');
  });
});
