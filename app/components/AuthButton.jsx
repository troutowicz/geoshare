'use strict';

import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';

class AuthButton extends React.Component {
  _getStyles() {
    const theme = this.context.muiTheme.component.flatButton;

    return {
      hoverColor: theme.hoverColor,
    };
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
  muiTheme: React.PropTypes.object,
};

AuthButton.propTypes = {
  label: React.PropTypes.string,
  onTouchTap: React.PropTypes.func,
  style: React.PropTypes.object,
};

AuthButton.defaultProps = {
  label: 'Login',
  style: {},
};

export default AuthButton;
