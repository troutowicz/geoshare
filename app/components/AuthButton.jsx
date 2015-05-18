'use strict';

const React = require('react');
const FlatButton = require('material-ui/lib/flat-button');
const StyleSheet = require('react-style');

class AuthButton extends React.Component {
  _getStyles() {
    const theme = this.context.muiTheme.component.flatButton;

    return StyleSheet.create({
      hoverColor: theme.hoverColor
    });
  }

  render() {
    const styles = this._getStyles.call(this);

    return (
      <FlatButton
        {...this.props}
        hoverColor={styles.hoverColor}
      />
    );
  }
}

AuthButton.contextTypes = {
  muiTheme: React.PropTypes.object
};

AuthButton.propTypes = {
  label: React.PropTypes.string,
  onTouchTap: React.PropTypes.func,
  style: React.PropTypes.object
};

AuthButton.defaultProps = {
  label: 'Login',
  style: {}
};

module.exports = AuthButton;
