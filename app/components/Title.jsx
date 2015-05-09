'use strict';

import React from 'react';
import transitions from 'material-ui/lib/styles/transitions';
import { ToolbarTitle } from 'material-ui/lib/toolbar';

class Title extends React.Component {
  constructor(props) {
    super(props);

    this.state = {hovered: false};
  }

  _getStyle() {
    const theme = this.context.muiTheme.component.title;

    return {
      color: this.state.hovered ? theme.hoverColor : theme.color,
      fontSize: '24px',
      paddingRight: '0',
      transition: transitions.easeOut(),
    };
  }

  _handleMouseOver() {
    this.setState({hovered: true});
  }

  _handleMouseOut() {
    this.setState({hovered: false});
  }

  render() {
    const style = this._getStyle.call(this);

    return (
      <ToolbarTitle
        onMouseOut={this._handleMouseOut.bind(this)}
        onMouseOver={this._handleMouseOver.bind(this)}
        style={style}
        text='GeoShare'
      />
    );
  }
}

Title.contextTypes = {
  muiTheme: React.PropTypes.object,
};

Title.propTypes = {
  text: React.PropTypes.string,
};

export default Title;
