'use strict';

const React = require('react/addons');
const TestUtils = React.addons.TestUtils;
const assert = require('chai').assert;

const compWithContext = require('../../utils/compWithContext');
const TopBar = compWithContext(
  require('../../../app/components/TopBar')
);
const Title = require('../../../app/components/Title')
const FlowButton = require('../../../app/components/FlowButton');
const AuthButton = require('../../../app/components/AuthButton');
const GithubButton = require('../../../app/components/GithubButton');

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
      repoUrl: React.PropTypes.string.isRequired
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
