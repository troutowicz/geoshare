'use strict';

const React = require('react');
const { FlatButton } = require('material-ui');

class FlowButton extends React.Component {
  render() {
    return (
      <FlatButton
        label={this.props.label}
        onClick={this.props.onClick} />
    );
  }
}

FlowButton.propTypes = {
  label: React.PropTypes.string,
  onClick: React.PropTypes.func
};

FlowButton.defaultProps = {
  label: 'Pause',
  onClick() {}
};

module.exports = FlowButton;
