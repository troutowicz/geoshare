'use strict';

import React from 'react/addons';
import { assert } from 'chai';

import compWithContext from '../../utils/compWithContext';
import GithubButtonRaw from '../../../app/components/GithubButton';

const GithubButton = compWithContext(GithubButtonRaw);
const TestUtils = React.addons.TestUtils;

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
