'use strict';

const React = require('react/addons');
const TestUtils = React.addons.TestUtils;

const assert = require('chai').assert;
const sinon = require('sinon');

const AuthButton = require('../../../app/components/AuthButton');

describe('AuthButton component', function () {
  it('should set value using label property', function() {
    const label = 'Foo';

    const component = React.render(
      <AuthButton label={label} />,
      document.body
    );

    const buttonNode = TestUtils.findRenderedComponentWithType(component, AuthButton).getDOMNode();
    const value = buttonNode.getElementsByTagName('span')[0].innerHTML;

    assert.equal(value, label, 'label set');
  });

  it('should call onClick property', function () {
    const onClick = sinon.spy();

    const component = React.render(
      <AuthButton onClick={onClick} />,
      document.body
    );

    const buttonNode = TestUtils.findRenderedComponentWithType(component, AuthButton).getDOMNode();
    TestUtils.Simulate.click(buttonNode);

    assert.ok(onClick.calledOnce, 'click handler called');
  });
});
