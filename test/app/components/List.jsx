'use strict';

const React = require('react/addons');
const TestUtils = React.addons.TestUtils;

const assert = require('chai').assert;

const List = require('../../../app/components/List');
const ListItem = require('../../../app/components/ListItem');

describe('List component', function () {
  it('should embed ListItem component for each item in itemData property', function () {
    const data = [
      {
        id: 1,
        user: {
          profile_picture: 'foo',
          full_name: 'foo',
          username: 'foo'
        }
      },
      {
        id: 2,
        user: {
          profile_picture: 'foo',
          full_name: 'foo',
          username: 'foo'
        }
      }
    ];
    const component = React.render(
      <List itemData={data} />,
      document.body
    );

    const numListItems = TestUtils.scryRenderedComponentsWithType(component, ListItem).length;
    assert.equal(numListItems, data.length, 'correct number of list items');
  });
});
