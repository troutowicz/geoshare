import stampit from 'react-stampit';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/lib/toolbar';

import authButtonFactory from './AuthButton';
import flowButtonFactory from './FlowButton';
import githubButtonFactory from './GithubButton';
import titleFactory from './Title';

export default React => {
  const AuthButton = authButtonFactory(React);
  const FlowButton = flowButtonFactory(React);
  const GithubButton = githubButtonFactory(React);
  const Title = titleFactory(React);

  return stampit(React, {
    displayName: 'TopBar',

    contextTypes: {
      loggedIn: React.PropTypes.bool.isRequired,
      muiTheme: React.PropTypes.object,
      repoUrl: React.PropTypes.string.isRequired,
      tag: React.PropTypes.string.isRequired,
    },

    propTypes: {
      flow: React.PropTypes.string,
      itemCount: React.PropTypes.number,
      style: React.PropTypes.object,
      updateFlow: React.PropTypes.func,
    },

    defaultProps: {
      itemCount: 0,
      style: {},
    },

    _getStyles() {
      const theme = this.context.muiTheme.component.toolbar;

      return {
        root: {
          borderBottom: `1px solid ${theme.borderColor}`,
          boxShadow: '0px 1px 6px rgba(0, 0, 0, 0.12)',
        },
        hashtag: {
          position: 'absolute',
          top: '0',
          left: '50%',
          transform: 'translate(-50%, 0px)',
          color: theme.textColor,
          fontSize: '15px',
          lineHeight: '56px',
        },
        toolbarGroup: {
          root: {
            float: 'right',
          },
          flatButton: {
            bottom: '1px',
            margin: '0 24px',
          },
          iconButton: {
            top: '4px',
            margin: '0 -12px',
          },
          separator: {
            float: 'none',
            marginLeft: 'auto',
          },
        },
      };
    },

    _onLoginTouch() {
      window.location.href = '/auth';
    },

    _onLogoutTouch() {
      window.location.href = '/logout';
    },

    _onFlowTouch() {
      this.props.updateFlow(this.props.flow);
    },

    render() {
      let styles = this._getStyles.call(this);

      let hashtag = `#${this.context.tag}`;
      let authTouch = this._onLoginTouch;
      let authLabel = 'Login';

      if (this.context.loggedIn) {
        authTouch = this._onLogoutTouch;
        authLabel = 'Logout';
      }

      if (this.props.itemCount > 0) {
        hashtag = `${hashtag} (${this.props.itemCount})`;
      }

      return (
        <Toolbar style={styles.root}>
          <Title />
          <div className='hashtag' style={styles.hashtag}>
            {hashtag}
          </div>
          <ToolbarGroup key={1} style={styles.toolbarGroup.root}>
            <FlowButton label={this.props.flow} onTouchTap={this._onFlowTouch.bind(this)} style={styles.toolbarGroup.flatButton} />
            <ToolbarSeparator style={styles.toolbarGroup.separator} />
            <AuthButton label={authLabel} onTouchTap={authTouch} style={styles.toolbarGroup.flatButton} />
            <GithubButton repoUrl={this.context.repoUrl} style={styles.toolbarGroup.iconButton} />
          </ToolbarGroup>
        </Toolbar>
      );
    },
  });
};
