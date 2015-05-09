'use strict';

import React from 'react';
import Paper from 'material-ui/lib/paper';
import transitions from 'material-ui/lib/styles/transitions';
import typography from 'material-ui/lib/styles/typography';
import { mergeAndPrefix } from '../utils/stylePropable';

class ListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {hovered: false};
  }

  _getStyles() {
    const theme = this.context.muiTheme.component.listItem;

    let backgroundColor = theme.color;
    if (this.state.hovered) {
      backgroundColor = this.props.hoverColor || theme.hoverColor;
    }

    return {
      root: {
        backgroundColor,
        cursor: 'pointer',
        height: '72px',
        transition: transitions.easeOut(),
      },
      icon: {
        root: {
          position: 'absolute',
          marginLeft: '16px',
          marginTop: '19px',
        },
        paper: {
          overflow: 'hidden',
          height: '40px',
        },
        image: {
          width: '40px',
        },
      },
      content: {
        root: {
          paddingLeft: '72px',
          paddingRight: '16px',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
        },
        title: {
          paddingTop: '20px',
          fontSize: '1.2em',
          fontWeight: typography.fontWeightMedium,
        },
        description: {
          marginTop: '-4px',
          fontSize: '0.75em',
        },
      },
      borderBottom: {
        position: 'absolute',
        marginTop: '16px',
        right: '0',
        left: '72px',
        borderBottom: `1px solid ${theme.borderColor}`,
      },
    };
  }

  _handleMouseOver(e) {
    this.setState({hovered: true});
    if (this.props.onMouseOver) {
      this.props.onMouseOver(e);
    }
  }

  _handleMouseOut(e) {
    this.setState({hovered: false});
    if (this.props.onMouseOut) {
      this.props.onMouseOut(e);
    }
  }

  render() {
    const styles = this._getStyles();
    /* eslint-disable */
    const {
      description,
      icon,
      onMouseOut,
      onMouseOver,
      title,
      ...other
    } = this.props;
    /* eslint-enable */

    return (
      <li
        {...other}
        onMouseOut={this._handleMouseOut.bind(this)}
        onMouseOver={this._handleMouseOver.bind(this)}
        style={mergeAndPrefix(styles.root)}
      >
        <div className='icon' style={styles.icon.root}>
          <Paper circle={true} style={styles.icon.paper} zDepth={0} >
            <img src={icon} style={styles.icon.image} />
          </Paper>
        </div>
        <div className='content' style={styles.content.root}>
          <div dangerouslySetInnerHTML={{__html: title}} style={styles.content.title} ></div>
          <div dangerouslySetInnerHTML={{__html: description}} style={styles.content.description} ></div>
        </div>
        <div className='border-bottom' style={styles.borderBottom} />
      </li>
    );
  }
}

ListItem.contextTypes = {
  muiTheme: React.PropTypes.object,
};

ListItem.propTypes = {
  description: React.PropTypes.string,
  hoverColor: React.PropTypes.string,
  icon: React.PropTypes.string,
  onClick: React.PropTypes.func,
  onMouseOut: React.PropTypes.func,
  onMouseOver: React.PropTypes.func,
  title: React.PropTypes.string,
};

ListItem.defaultProps = {
  description: '',
  title: '',
};

export default ListItem;
