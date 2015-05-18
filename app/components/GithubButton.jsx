'use strict';

const React = require('react');
const IconButton = require('material-ui/lib/icon-button');
const StyleSheet = require('react-style');

class GithubButton extends React.Component {
  _getStyles() {
    const theme = this.context.muiTheme.component.githubButton;

    return StyleSheet.create({
      icon: {
        color: theme.color,
        iconHoverColor: theme.hoverColor
      },
      rippleColor: theme.rippleColor
    });
  }

  render() {
    const styles = this._getStyles();
    const {
      repoUrl,
      ...other
    } = this.props;

    return (
      <IconButton
        {...other}
        focusRippleColor={styles.rippleColor}
        href={repoUrl}
        iconClassName='mui-icon-github'
        iconStyle={styles.icon}
        linkButton={true}
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
