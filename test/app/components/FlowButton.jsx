import React from 'react/addons';
import sinon from 'sinon';
import { assert } from 'chai';

import compWithContext from '../../utils/compWithContext';
import flowButtonFactory from '../../../app/components/FlowButton';

const FlowButton = compWithContext(React, flowButtonFactory(React));
const TestUtils = React.addons.TestUtils;

describe('FlowButton component', function () {
  it('should set value using label property', function () {
    const label = 'Foo';

    const component = TestUtils.renderIntoDocument(
      <FlowButton label={label} />
    );
    const button = TestUtils.findRenderedComponentWithType(component, FlowButton);
    const value = React.findDOMNode(button).getElementsByTagName('span')[0].innerHTML;

    assert.equal(value, label, 'label set');
  });

  it('should call onClick property', function () {
    const onClick = sinon.spy();

    const component = TestUtils.renderIntoDocument(
      <FlowButton onClick={onClick} />
    );
    const button = TestUtils.findRenderedComponentWithType(component, FlowButton);

    TestUtils.Simulate.click(React.findDOMNode(button));
    assert.ok(onClick.calledOnce, 'click handler called');
  });
});
