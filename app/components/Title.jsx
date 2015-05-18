'use strict';

const React = require('react');
const ToolbarTitle = require('material-ui/lib/toolbar/toolbar-title');

const StyleSheet = require('react-style');
const transitions = require('material-ui/lib/styles/transitions');

class Title extends React.Component {
  constructor(props) {
    super(props);

    this.state = {hovered: false};
  }

  _getStyle() {
    const theme = this.context.muiTheme.component.title;

    return StyleSheet.create({
      color: this.state.hovered ? theme.hoverColor : theme.color,
      fontSize: '24px',
      paddingRight: '0',
      transition: transitions.easeOut()
    });
  }

  _handleMouseOver(e) {
    this.setState({hovered: true});
  }

  _handleMouseOut(e) {
    this.setState({hovered: false});
  }

  render() {
    const style = this._getStyle.call(this);

    return (
      <ToolbarTitle
        onMouseOut={this._handleMouseOut.bind(this)}
        onMouseOver={this._handleMouseOver.bind(this)}
        styles={style}
        text='GeoShare'
      />
    );
  }
}

Title.contextTypes = {
  muiTheme: React.PropTypes.object
};

Title.propTypes = {
  text: React.PropTypes.string
};

module.exports = Title;