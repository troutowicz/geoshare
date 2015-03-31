'use strict';

const React = require('react');
const { Toolbar, ToolbarGroup } = require('material-ui');
const FlowButton = require('./FlowButton');
const AuthButton = require('./AuthButton');
const GithubButton = require('./GithubButton');

const AppActions = require('../actions/AppActions');

module.exports = React.createClass({
  contextTypes: {
    tag: React.PropTypes.string.isRequired,
    loggedIn: React.PropTypes.bool.isRequired,
    repoUrl: React.PropTypes.string.isRequired
  },

  propTypes: {
    itemCount: React.PropTypes.number
  },

  getDefaultProps() {
    return {
      itemCount: 0
    };
  },

  _onLoginClick() { window.location.href = '/auth'; },

  _onLogoutClick() { window.location.href = '/logout'; },

  _onFlowClick() {
    AppActions.flow(this.props.flow);
  },

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
          <FlowButton label={this.props.flow} onClick={this._onFlowClick} />
          <span className='mui-toolbar-separator'>&nbsp;</span>
          <AuthButton label={authLabel} onClick={authClick} />
          <GithubButton repoUrl={this.context.repoUrl} />
        </ToolbarGroup>
      </Toolbar>
    );
  }
});
