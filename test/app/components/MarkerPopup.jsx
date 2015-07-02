import React from 'react/addons';
import { assert } from 'chai';

import markerPopupFactory from '../../../app/components/MarkerPopup';

const MarkerPopup = markerPopupFactory(React);
const TestUtils = React.addons.TestUtils;

describe('MarkerPopup component', function () {
  it('should set profile link using profileUrl property', function() {
    const profileUrl = 'https://instagram.com/me';

    const component = TestUtils.renderIntoDocument(
      <MarkerPopup profileUrl={profileUrl} />
    );
    const a = TestUtils.findRenderedDOMComponentWithTag(component, 'a');
    const href = React.findDOMNode(a).href;

    assert.equal(href, profileUrl, 'profile link set');
  });

  it('should set image URL using imgUrl property', function() {
    const imgUrl = 'https://instagram.com/me/img.png';

    const component = TestUtils.renderIntoDocument(
      <MarkerPopup imgUrl={imgUrl} />
    );
    const img = TestUtils.findRenderedDOMComponentWithTag(component, 'img');
    const src = React.findDOMNode(img).src;

    assert.equal(src, imgUrl, 'image url set');
  });

  it('should set caption using caption property', function() {
    const caption = 'foo';

    const component = TestUtils.renderIntoDocument(
      <MarkerPopup caption={caption} />
    );
    const div = TestUtils.scryRenderedDOMComponentsWithTag(component, 'div')[1];
    const innerHtml = React.findDOMNode(div).innerHTML;

    assert.equal(innerHtml, caption, 'caption set');
  });
});
