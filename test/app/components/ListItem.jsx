'use strict';

const React = require('react/addons');
const TestUtils = React.addons.TestUtils;

const assert = require('chai').assert;
const sinon = require('sinon');

const ListItem = require('../../../app/components/ListItem');

describe('ListItem component', function () {
  it('should embed children elements', function () {
    const component = React.render(
      <ListItem
        icon='foo'
        title='foo'
        description='foo'
      />,
      document.body
    );

    const listItem = TestUtils.findRenderedComponentWithType(component, ListItem);
    assert.ok(TestUtils.findRenderedDOMComponentWithClass(listItem, 'icon'), 'has icon');
    assert.ok(TestUtils.findRenderedDOMComponentWithClass(listItem, 'content'), 'has content');
    assert.ok(TestUtils.findRenderedDOMComponentWithClass(listItem, 'border-bottom'), 'has bottom border');
  });

  it('should call onClick property', function () {
    const onClick = sinon.spy();

    const component = React.render(
      <ListItem
        onClick={onClick}
      />,
      document.body
    );

    const listItem = TestUtils.findRenderedComponentWithType(component, ListItem);
    TestUtils.Simulate.click(React.findDOMNode(listItem));

    assert.ok(onClick.calledOnce, 'click handler called');
  });
});
