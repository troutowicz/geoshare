'use strict';

const React = require('react');
const AuthButton = require('./AuthButton');
const FlowButton = require('./FlowButton');
const GithubButton = require('./GithubButton');
const { Toolbar, ToolbarGroup } = require('material-ui');

class TopBar extends React.Component {
  _onLoginClick() { window.location.href = '/auth'; }

  _onLogoutClick() { window.location.href = '/logout'; }

  _onFlowClick() {
    this.props.updateFlow(this.props.flow);
  }

  render() {
    let counter = '';
    let authClick = this._onLoginClick;
    let authLabel = 'Login';

    if (this.context.loggedIn) {
      authClick = this._onLogoutClick;
      authLabel = 'Logout';
    }

    if (this.props.itemCount > 0) {
      counter = ' (' + this.props.itemCount + ')';
    }

    return (
      <Toolbar>
        <ToolbarGroup key={0} float='left'>
          <div className='mui-font-style-headline'>GeoShare</div>
        </ToolbarGroup>
        <div className='hashtag mui-font-style-subhead-1'>
          {'#' + this.context.tag + counter}
        </div>
        <ToolbarGroup key={1} float='right'>
          <FlowButton label={this.props.flow} onClick={this._onFlowClick.bind(this)} />
          <span className='mui-toolbar-separator'>&nbsp;</span>
          <AuthButton label={authLabel} onClick={authClick} />
          <GithubButton repoUrl={this.context.repoUrl} />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

TopBar.contextTypes = {
  loggedIn: React.PropTypes.bool.isRequired,
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
