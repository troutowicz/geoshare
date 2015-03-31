'use strict';

const React = require('react/addons');
const TestUtils = React.addons.TestUtils;

const assert = require('chai').assert;

const GithubButton = require('../../../app/components/GithubButton');

describe('GithubButton component', function () {
  it('should set href using repoUrl property', function() {
    const repoUrl = 'https://github.com/troutowicz/node-geoshare';

    const component = React.render(
      <GithubButton repoUrl={repoUrl} />,
      document.body
    );

    const buttonNode = TestUtils.findRenderedComponentWithType(component, GithubButton).getDOMNode();
    const href = buttonNode.href;

    assert.equal(href, repoUrl, 'href set');
  });
});
