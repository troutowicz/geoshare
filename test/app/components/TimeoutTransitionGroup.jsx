'use strict';

const React = require('react/addons');
const TestUtils = React.addons.TestUtils;
const assert = require('chai').assert;
const sinon = require('sinon');

const ReactCSSTransitionGroup = require('../../../app/components/TimeoutTransitionGroup');

describe('TimeoutTransitionGroup component', function () {
  before(function () {
    this.enterCSS = 'img-enter';
    this.enterActiveCSS = 'img-enter-active';
    this.leaveCSS = 'img-leave';
    this.leaveActiveCSS = 'img-leave-active';

    class Component extends React.Component {
      constructor(props) {
        super(props);

        this.state = { mounted: false };
      }

      componentDidMount() {
        this.setState({
          mounted: true,
          removeChild: false
        });
      }

      _simulateLeave() {
        this.setState({ removeChild: true });
      }

      render () {
        let child;

        if (this.state.mounted && !this.state.removeChild) {
          child = <img />;
        } else if (this.state.mounted && this.state.removeChild) {
          child = undefined;
        }

        return (
          <ReactCSSTransitionGroup
            transitionName='img'
            enterTimeout={this.props.enterTimeout}
            leaveTimeout={this.props.leaveTimeout}
          >
            {child}
          </ReactCSSTransitionGroup>
        );
      }
    }

    this.Component = Component;
  });

  beforeEach(function () {
    this.clock = sinon.useFakeTimers();
  });

  afterEach(function () {
    this.clock.restore();
  });

  it('should add appropriate CSS classes to entering children', function () {
    let component = TestUtils.renderIntoDocument(
      <this.Component enterTimeout={18} leaveTimeout={0} />
    );

    const child = React.findDOMNode(TestUtils.findRenderedDOMComponentWithTag(component, 'img'));

    assert.equal(child.className, this.enterCSS);

    this.clock.tick(17);
    assert.equal(child.className, this.enterCSS + ' ' + this.enterActiveCSS);

    this.clock.tick(1);
    assert.equal(child.className, '');
  });

  it('should add appropriate CSS classes to leaving children', function () {
    let component = TestUtils.renderIntoDocument(
      <this.Component enterTimeout={18} leaveTimeout={18} />
    );

    const child = React.findDOMNode(TestUtils.findRenderedDOMComponentWithTag(component, 'img'));

    // enter transition
    this.clock.tick(18);

    // leave simulation
    component._simulateLeave();
    assert.equal(child.className, this.leaveCSS);

    this.clock.tick(17);
    assert.equal(child.className, this.leaveCSS + ' ' + this.leaveActiveCSS);

    this.clock.tick(1);
    assert.equal(child.className, '');
  });

  it('should remove children after handling leave transition', function () {
    let component = TestUtils.renderIntoDocument(
      <this.Component enterTimeout={18} leaveTimeout={18} />
    );

    // enter transition
    this.clock.tick(18);

    // leave transition
    component._simulateLeave();
    this.clock.tick(18);

    assert.lengthOf(TestUtils.scryRenderedDOMComponentsWithTag(component, 'img'), 0);
  });
});
