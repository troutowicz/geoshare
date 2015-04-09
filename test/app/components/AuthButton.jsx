'use strict';

const React = require('react/addons');
const TestUtils = React.addons.TestUtils;

const assert = require('chai').assert;
const sinon = require('sinon');

const AuthButton = require('../../../app/components/AuthButton');

describe('AuthButton component', function () {
  it('should set value using label property', function() {
    const label = 'Foo';

    const component = TestUtils.renderIntoDocument(
      <AuthButton label={label} />
    );
    const button = TestUtils.findRenderedComponentWithType(component, AuthButton);
    const value = React.findDOMNode(button).getElementsByTagName('span')[0].innerHTML;

    assert.equal(value, label, 'label set');
  });

  it('should call onClick property', function () {
    const onClick = sinon.spy();

    const component = TestUtils.renderIntoDocument(
      <AuthButton onClick={onClick} />
    );
    const button = TestUtils.findRenderedComponentWithType(component, AuthButton);

    TestUtils.Simulate.click(React.findDOMNode(button));
    assert.ok(onClick.calledOnce, 'click handler called');
  });
});
