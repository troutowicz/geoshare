'use strict';

const React = require('react');
const AuthButton = require('./AuthButton');
const FlowButton = require('./FlowButton');
const GithubButton = require('./GithubButton');
const Title = require('./Title');
const { Toolbar, ToolbarGroup, ToolbarSeparator } = require('material-ui/lib/toolbar');
const StyleSheet = require('react-style');

class TopBar extends React.Component {
  _getStyles() {
    const theme = this.context.muiTheme.component.toolbar;

    return StyleSheet.create({
      root: {
        borderBottom: `1px solid ${theme.borderColor}`,
        boxShadow: '0px 1px 6px rgba(0, 0, 0, 0.12)'
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
          float: 'right'
        },
        flatButton: {
          bottom: '1px',
          margin: '0 24px'
        },
        iconButton: {
          top: '4px',
          margin: '0 -12px'
        },
        separator: {
          float: 'none',
          marginLeft: 'auto'
        }
      }
    });
  }

  _onLoginTouch() { window.location.href = '/auth'; }

  _onLogoutTouch() { window.location.href = '/logout'; }

  _onFlowTouch() {
    this.props.updateFlow(this.props.flow);
  }

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
      <Toolbar styles={styles.root}>
        <Title />
        <div className='hashtag' styles={styles.hashtag}>
          {hashtag}
        </div>
        <ToolbarGroup key={1} styles={styles.toolbarGroup.root}>
          <FlowButton styles={styles.toolbarGroup.flatButton} label={this.props.flow} onTouchTap={this._onFlowTouch.bind(this)} />
          <ToolbarSeparator styles={styles.toolbarGroup.separator} />
          <AuthButton styles={styles.toolbarGroup.flatButton} label={authLabel} onTouchTap={authTouch} />
          <GithubButton styles={styles.toolbarGroup.iconButton} repoUrl={this.context.repoUrl} />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

TopBar.contextTypes = {
  loggedIn: React.PropTypes.bool.isRequired,
  muiTheme: React.PropTypes.object,
  repoUrl: React.PropTypes.string.isRequired,
  tag: React.PropTypes.string.isRequired
};

TopBar.propTypes = {
  flow: React.PropTypes.string,
  itemCount: React.PropTypes.number,
  updateFlow: React.PropTypes.func
};

TopBar.defaultProps = {
  itemCount: 0
};

module.exports = TopBar;
