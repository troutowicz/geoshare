'use strict';

import React from 'react/addons';
import sinon from 'sinon';
import { assert } from 'chai';

import ReactCSSTransitionGroup from '../../../app/components/TimeoutTransitionGroup';

const TestUtils = React.addons.TestUtils;

describe('TimeoutTransitionGroup component', function () {
  before(function () {
    this.style = {
      enter: {
        default: {
          opacity: '0.01',
          transition: 'opacity .3s ease-in'
        },
        active: {
          opacity: '1'
        }
      },
      leave: {
        default: {
          opacity: '1',
          transition: 'opacity .3s ease-in'
        },
        active: {
          opacity: '0.01'
        }
      }
    };

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
            enterTimeout={this.props.enterTimeout}
            leaveTimeout={this.props.leaveTimeout}
            style={this.props.style}
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

  it('should add appropriate CSS style to entering children', function () {
    let component = TestUtils.renderIntoDocument(
      <this.Component enterTimeout={18} leaveTimeout={0} style={this.style} />
    );

    const child = React.findDOMNode(TestUtils.findRenderedDOMComponentWithTag(component, 'img'));

    Object.keys(this.style.enter.default).forEach((att) => {
      assert.equal(child.style[att], this.style.enter.default[att]);
    });

    this.clock.tick(17);
    Object.keys(this.style.enter.active).forEach((att) => {
      assert.equal(child.style[att], this.style.enter.active[att]);
    });

    this.clock.tick(1);
    Object.keys(this.style.enter.default).forEach((att) => {
      assert.equal(child.style[att], '');
    });
  });

  it('should add appropriate CSS style to leaving children', function () {
    let component = TestUtils.renderIntoDocument(
      <this.Component enterTimeout={18} leaveTimeout={18} style={this.style} />
    );

    const child = React.findDOMNode(TestUtils.findRenderedDOMComponentWithTag(component, 'img'));

    // enter transition
    this.clock.tick(18);

    // leave simulation
    component._simulateLeave();
    Object.keys(this.style.leave.default).forEach((att) => {
      assert.equal(child.style[att], this.style.leave.default[att]);
    });

    this.clock.tick(17);
    Object.keys(this.style.leave.active).forEach((att) => {
      assert.equal(child.style[att], this.style.leave.active[att]);
    });

    this.clock.tick(1);
    Object.keys(this.style.leave.default).forEach((att) => {
      assert.equal(child.style[att], '');
    });
  });

  it('should remove children after handling leave transition', function () {
    let component = TestUtils.renderIntoDocument(
      <this.Component enterTimeout={18} leaveTimeout={18} style={this.style} />
    );

    // enter transition
    this.clock.tick(18);

    // leave transition
    component._simulateLeave();
    this.clock.tick(18);

    assert.lengthOf(TestUtils.scryRenderedDOMComponentsWithTag(component, 'img'), 0);
  });
});
