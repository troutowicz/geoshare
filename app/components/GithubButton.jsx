'use strict';

const React = require('react');
const IconButton = require('material-ui/lib/icon-button');

class GithubButton extends React.Component {
  _getStyle() {
    const theme = this.context.muiTheme.component.githubButton;

    return {
      rippleColor: theme.rippleColor,
      icon: {
        color: theme.color,
        iconHoverColor: theme.hoverColor
      }
    };
  }

  render() {
    const styles = this._getStyle();

    return (
      <IconButton
        focusRippleColor={styles.rippleColor}
        href={this.props.repoUrl}
        iconClassName='mui-icon-github'
        iconStyle={styles.icon}
        linkButton={true}
        style={this.props.style}
        touchRippleColor={styles.rippleColor} />
    );
  }
}

GithubButton.contextTypes = {
  muiTheme: React.PropTypes.object
};

GithubButton.propTypes = {
  repoUrl: React.PropTypes.string,
  style: React.PropTypes.object
};

GithubButton.defaultProps = {
  style: {}
}

module.exports = GithubButton;
