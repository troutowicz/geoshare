'use strict';

const React = require('react');

const withHoverStyle = (Component, opts) => {
  class ComponentWithHover extends React.Component {
    _handleMouseOver() {
      const theme = this.context.muiTheme.component[opts.type];

      React.findDOMNode(this).style[opts.styleProp] = theme.hoverColor;
    }

    _handleMouseOut() {
      const theme = this.context.muiTheme.component[opts.type];

      React.findDOMNode(this).style[opts.styleProp] = theme.color;
    }

    _onClick() {
      if (this.props.onClick) {
        this.props.onClick();
      }

      // persist hover state through ripple
      this._handleMouseOver();
    }

    render() {
      const hoverProps = {
        onMouseOver: this._handleMouseOver.bind(this),
        onMouseOut: this._handleMouseOut.bind(this)
      };

      if (opts.hasRipple) {
        hoverProps.onClick = this._onClick.bind(this);
      }

      return React.createElement(Component, Object.assign({}, this.props, hoverProps));
    }
  }

  ComponentWithHover.contextTypes = {
    muiTheme: React.PropTypes.object
  };

  return ComponentWithHover;
};

module.exports = withHoverStyle;
