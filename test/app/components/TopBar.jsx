import React from 'react/addons';
import { assert } from 'chai';

import compWithContext from '../../utils/compWithContext';
import authButtonFactory from '../../../app/components/AuthButton';
import flowButtonFactory from '../../../app/components/FlowButton';
import githubButtonFactory from '../../../app/components/GithubButton';
import titleFactory from '../../../app/components/Title';
import topBarFactory from '../../../app/components/TopBar';

const AuthButton = authButtonFactory(React);
const FlowButton = flowButtonFactory(React);
const GithubButton = githubButtonFactory(React);
const Title = titleFactory(React);
const TopBar = compWithContext(React, topBarFactory(React));
const TestUtils = React.addons.TestUtils;

describe('TopBar component', function () {
  before(function() {
    class TopBarWithContext extends React.Component {
      getChildContext() {
        return { tag: 'tag', loggedIn: false, repoUrl: '' };
      }

      render() {
        return <TopBar itemCount={this.props.itemCount} />;
      }
    }

    TopBarWithContext.childContextTypes = {
      tag: React.PropTypes.string.isRequired,
      loggedIn: React.PropTypes.bool.isRequired,
      repoUrl: React.PropTypes.string.isRequired,
    };

    TopBarWithContext.propTypes = {
      itemCount: React.PropTypes.number,
    };

    this.TopBar = TopBarWithContext;
  });

  it('should display counter when itemCount property > 0', function () {
    const component = TestUtils.renderIntoDocument(
      <this.TopBar itemCount={1} />
    );
    const counter = TestUtils.findRenderedDOMComponentWithClass(component, 'hashtag');

    assert.equal(React.findDOMNode(counter).textContent, '#tag (1)', 'counter visible');
  });

  it('should not display counter when itemCount property == 0', function () {
    const component = TestUtils.renderIntoDocument(
      <this.TopBar />
    );
    const counter = TestUtils.findRenderedDOMComponentWithClass(component, 'hashtag');

    assert.equal(React.findDOMNode(counter).textContent, '#tag', 'counter not visible');
  });

  it('should embed children components', function () {
    const component = TestUtils.renderIntoDocument(
      <this.TopBar />
    );

    assert.ok(TestUtils.findRenderedComponentWithType(component, Title), 'has title');
    assert.ok(TestUtils.findRenderedComponentWithType(component, FlowButton), 'has flow button');
    assert.ok(TestUtils.findRenderedComponentWithType(component, AuthButton), 'has auth button');
    assert.ok(TestUtils.findRenderedComponentWithType(component, GithubButton), 'has github button');
  });
});
