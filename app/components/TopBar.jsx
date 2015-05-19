'use strict';

import React from 'react';
import AuthButton from './AuthButton';
import FlowButton from './FlowButton';
import GithubButton from './GithubButton';
import Title from './Title';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/lib/toolbar';

class TopBar extends React.Component {
  _getStyles() {
    const theme = this.context.muiTheme.component.toolbar;

    return {
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
    };
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
      <Toolbar style={styles.root}>
        <Title />
        <div className='hashtag' style={styles.hashtag}>
          {hashtag}
        </div>
        <ToolbarGroup key={1} style={styles.toolbarGroup.root}>
          <FlowButton style={styles.toolbarGroup.flatButton} label={this.props.flow} onTouchTap={this._onFlowTouch.bind(this)} />
          <ToolbarSeparator style={styles.toolbarGroup.separator} />
          <AuthButton style={styles.toolbarGroup.flatButton} label={authLabel} onTouchTap={authTouch} />
          <GithubButton style={styles.toolbarGroup.iconButton} repoUrl={this.context.repoUrl} />
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
  style: React.PropTypes.object,
  updateFlow: React.PropTypes.func
};

TopBar.defaultProps = {
  itemCount: 0,
  style: {}
};

export default TopBar;
