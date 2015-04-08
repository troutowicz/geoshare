'use strict';

const React = require('react/addons');
const TestUtils = React.addons.TestUtils;

const assert = require('chai').assert;

const GithubButton = require('../../../app/components/GithubButton');

describe('GithubButton component', function () {
  it('should set href using repoUrl property', function() {
    const repoUrl = 'https://github.com/troutowicz/node-geoshare';

    const component = TestUtils.renderIntoDocument(
      <GithubButton repoUrl={repoUrl} />
    );
    const button = TestUtils.findRenderedComponentWithType(component, GithubButton);
    const href = React.findDOMNode(button).href;

    assert.equal(href, repoUrl, 'href set');
  });
});
