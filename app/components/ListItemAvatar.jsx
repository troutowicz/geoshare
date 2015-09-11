'use strict';

import React from 'react';
import Avatar from 'material-ui/lib/avatar';

class ListItemAvatar extends React.Component {
  _getStyles() {
    return {
      border: 'none',
      position: 'absolute',
      top: '16px',
      left: '16px',
      width: '38px',
      height: '38px',
    };
  }

  render() {
    const style = this._getStyles();

    return (
      <Avatar
        {...this.props}
        style={style}
      />
    );
  }
}

ListItemAvatar.contextTypes = {
  muiTheme: React.PropTypes.object,
};

ListItemAvatar.propTypes = {
  src: React.PropTypes.string,
};

export default ListItemAvatar;
