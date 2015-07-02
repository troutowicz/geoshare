import stampit from 'react-stampit';
import IconButton from 'material-ui/lib/icon-button';

export default React => stampit(React, {
  displayName: 'GithubButton',

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    repoUrl: React.PropTypes.string,
    style: React.PropTypes.object,
  },

  defaultProps: {
    style: {},
  },

  _getStyle() {
    const theme = this.context.muiTheme.component.githubButton;

    return {
      rippleColor: theme.rippleColor,
      icon: {
        color: theme.color,
        iconHoverColor: theme.hoverColor,
      },
    };
  },

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
  },
});
