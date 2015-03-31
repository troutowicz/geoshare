'use strict';

const React = require('react');
const { FlatButton } = require('material-ui');

module.exports = React.createClass ({
  propTypes: {
    label: React.PropTypes.string,
    onClick: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      label: 'Pause',
      onClick() {}
    };
  },

  render() {
    return (
      <FlatButton
        label={this.props.label}
        onClick={this.props.onClick} />
    );
  }
});
