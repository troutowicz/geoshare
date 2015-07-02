/**
 * The CSSTransitionGroup component uses the 'transitionend' event, which
 * browsers will not send for any number of reasons, including the
 * transitioning node not being painted or in an unfocused tab.
 *
 * This TimeoutTransitionGroup instead uses a user-defined timeout to determine
 * when it is a good time to remove the component. Currently there is only one
 * timeout specified, but in the future it would be nice to be able to specify
 * separate timeouts for enter and leave, in case the timeouts for those
 * animations differ. Even nicer would be some sort of inspection of the CSS to
 * automatically determine the duration of the animation or transition.
 *
 * This is adapted from Facebook's CSSTransitionGroup which is in the React
 * addons and under the Apache 2.0 License.
 */

import stampit from 'react-stampit';

const TICK = 17;

/**
 * EVENT_NAME_MAP is used to determine which event fired when a
 * transition/animation ends, based on the style property used to
 * define that event.
 */
let EVENT_NAME_MAP = {
  transitionend: {
    transition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'mozTransitionEnd',
    OTransition: 'oTransitionEnd',
    msTransition: 'MSTransitionEnd',
  },

  animationend: {
    animation: 'animationend',
    WebkitAnimation: 'webkitAnimationEnd',
    MozAnimation: 'mozAnimationEnd',
    OAnimation: 'oAnimationEnd',
    msAnimation: 'MSAnimationEnd',
  },
};

let endEvents = [];

(function detectEvents() {
  if (typeof window === 'undefined') {
    return;
  }

  const testEl = document.createElement('div');
  const style = testEl.style;

  // On some platforms, in particular some releases of Android 4.x, the
  // un-prefixed 'animation' and 'transition' properties are defined on the
  // style object but the events that fire will still be prefixed, so we need
  // to check if the un-prefixed events are useable, and if not remove them
  // from the map
  if (!window.AnimationEvent) {
    delete EVENT_NAME_MAP.animationend.animation;
  }

  if (!window.TransitionEvent) {
    delete EVENT_NAME_MAP.transitionend.transition;
  }

  for (let baseEvents of Object.keys(EVENT_NAME_MAP)) {
    for (let styleName of Object.keys(EVENT_NAME_MAP[baseEvents])) {
      if (styleName in style) {
        endEvents.push(EVENT_NAME_MAP[baseEvents][styleName]);
        break;
      }
    }
  }
}());

function animationSupported() {
  return endEvents.length !== 0;
}

function addStyle(element, style) {
  Object.keys(style).forEach((att) => {
    element.style[att] = style[att];
  });

  return element;
}

function removeStyle(element, style) {
  Object.keys(style).forEach((att) => {
    element.style[att] = '';
  });

  return element;
}

const timeoutTransitionGroupChildFactory = React => stampit(React, {
  _transition(animationType, finishCallback) {
    let node = React.findDOMNode(this);

    const endListener = () => {
      removeStyle(node, this.props.style[animationType].default);

      // Usually this optional callback is used for informing an owner of
      // a leave animation and telling it to remove the child.
      if (finishCallback) {
        finishCallback();
      }
    };

    if (!animationSupported()) {
      endListener();
    } else {
      if (animationType === 'enter') {
        this.animationTimeout = setTimeout(endListener, this.props.enterTimeout);
      } else if (animationType === 'leave') {
        this.animationTimeout = setTimeout(endListener, this.props.leaveTimeout);
      }
    }

    addStyle(node, this.props.style[animationType].default);

    // Need to do this to actually trigger a transition.
    this._queueStyle(this.props.style[animationType].active);
  },

  _queueStyle(style) {
    this.styleQueue.push(style);

    if (!this.timeout) {
      this.timeout = setTimeout(this._flushClassNameQueue.bind(this), TICK);
    }
  },

  _flushClassNameQueue() {
    this.styleQueue.forEach((style) => {
      addStyle(React.findDOMNode(this), style);
    });

    this.styleQueue.length = 0;
    this.timeout = null;
  },

  componentWillMount() {
    this.styleQueue = [];
  },

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
    }
  },

  componentWillEnter(done) {
    if (this.props.enter) {
      this._transition('enter', done);
    } else {
      done();
    }
  },

  componentWillLeave(done) {
    if (this.props.leave) {
      this._transition('leave', done);
    } else {
      done();
    }
  },

  render() {
    return React.Children.only(this.props.children);
  },
});

export default React => {
  const ReactTransitionGroup = React.addons.TransitionGroup;
  const TimeoutTransitionGroupChild = timeoutTransitionGroupChildFactory(React);

  return stampit(React, {
    displayName: 'ReactCSSTransitionGroup',

    propTypes: {
      enterTimeout: React.PropTypes.number.isRequired,
      leaveTimeout: React.PropTypes.number.isRequired,
      style: React.PropTypes.object.isRequired,
      transitionEnter: React.PropTypes.bool,
      transitionLeave: React.PropTypes.bool,
    },

    defaultProps: {
      transitionEnter: true,
      transitionLeave: true,
    },

    _wrapChild(child) {
      return (
        <TimeoutTransitionGroupChild
          enter={this.props.transitionEnter}
          enterTimeout={this.props.enterTimeout}
          leave={this.props.transitionLeave}
          leaveTimeout={this.props.leaveTimeout}
          style={this.props.style}
        >
          {child}
        </TimeoutTransitionGroupChild>
      );
    },

    render() {
      /* eslint-disable */
      const {style, ...props} = this.props;
      /* eslint-enable */

      return (
        <ReactTransitionGroup
          {...props}
          childFactory={this._wrapChild.bind(this)}
        />
      );
    },
  });
};
