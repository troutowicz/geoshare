'use strict';

const React = require('react');
const { FlatButton } = require('material-ui');

class AuthButton extends React.Component {
  render() {
    return (
      <FlatButton
        label={this.props.label}
        onClick={this.props.onClick} />
    );
  }
}

AuthButton.propTypes = {
  label: React.PropTypes.string,
  onClick: React.PropTypes.func
};

AuthButton.defaultProps = {
  label: 'Login',
  onClick() {}
};

module.exports = AuthButton;
