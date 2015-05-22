import React from 'react/addons';
import sinon from 'sinon';
import { assert } from 'chai';

import compWithContext from '../../utils/compWithContext';
import listItemFactory from '../../../app/components/ListItem';

const ListItem = compWithContext(React, listItemFactory(React));
const TestUtils = React.addons.TestUtils;

describe('ListItem component', function () {
  it('should embed children elements', function () {
    const component = TestUtils.renderIntoDocument(
      <ListItem
        description='foo'
        icon='foo'
        title='foo'
      />
    );
    const listItem = TestUtils.findRenderedComponentWithType(component, ListItem);

    assert.ok(TestUtils.findRenderedDOMComponentWithClass(listItem, 'icon'), 'has icon');
    assert.ok(TestUtils.findRenderedDOMComponentWithClass(listItem, 'content'), 'has content');
    assert.ok(TestUtils.findRenderedDOMComponentWithClass(listItem, 'border-bottom'), 'has bottom border');
  });

  it('should call onClick property', function () {
    const onClick = sinon.spy();

    const component = TestUtils.renderIntoDocument(
      <ListItem onClick={onClick} />
    );
    const listItem = TestUtils.findRenderedComponentWithType(component, ListItem);

    TestUtils.Simulate.click(React.findDOMNode(listItem));
    assert.ok(onClick.calledOnce, 'click handler called');
  });
});
