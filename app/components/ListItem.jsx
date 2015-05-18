'use strict';

const React = require('react');
const Paper = require('material-ui/lib/paper');

const StyleSheet = require('react-style');
const transitions = require('material-ui/lib/styles/transitions');
const typography = require('material-ui/lib/styles/typography');

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

    return StyleSheet.create({
      root: {
        backgroundColor: backgroundColor,
        cursor: 'pointer',
        height: '72px',
        transition: transitions.easeOut()
      },
      icon: {
        root: {
          position: 'absolute',
          marginLeft: '16px',
          marginTop: '19px'
        },
        paper: {
          overflow: 'hidden',
          height: '40px'
        },
        image: {
          width: '40px'
        }
      },
      content: {
        root: {
          paddingLeft: '72px',
          paddingRight: '16px',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          overflow: 'hidden'
        },
        title: {
          paddingTop: '20px',
          fontSize: '1.2em',
          fontWeight: typography.fontWeightMedium
        },
        description: {
          marginTop: '-4px',
          fontSize: '0.75em'
        }
      },
      borderBottom: {
        position: 'absolute',
        marginTop: '16px',
        right: '0',
        left: '72px',
        borderBottom: `1px solid ${theme.borderColor}`
      }
    });
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
    const {
      description,
      icon,
      onMouseOut,
      onMouseOver,
      title,
      ...other
    } = this.props;

    return (
      <li
        {...other}
        onMouseOut={this._handleMouseOut.bind(this)}
        onMouseOver={this._handleMouseOver.bind(this)}
        styles={styles.root}
      >
        <div className='icon' styles={styles.icon.root}>
          <Paper styles={styles.icon.paper} zDepth={0} circle={true} >
            <img styles={styles.icon.image} src={icon} />
          </Paper>
        </div>
        <div className='content' styles={styles.content.root}>
          <div styles={styles.content.title} dangerouslySetInnerHTML={{__html: title}}></div>
          <div styles={styles.content.description} dangerouslySetInnerHTML={{__html: description}}></div>
        </div>
        <div className='border-bottom' styles={styles.borderBottom} />
      </li>
    );
  }
}

ListItem.contextTypes = {
  muiTheme: React.PropTypes.object
};

ListItem.propTypes = {
  description: React.PropTypes.string,
  hoverStyle: React.PropTypes.string,
  icon: React.PropTypes.string,
  onClick: React.PropTypes.func,
  title: React.PropTypes.string
};

ListItem.defaultProps = {
  title: '',
  description: ''
};

module.exports = ListItem;
