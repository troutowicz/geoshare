'use strict';

const React = require('react');
const { IconButton } = require('material-ui');

class GithubButton extends React.Component {
  render() {
    return (
      <IconButton
        iconClassName='mui-icon-github'
        href={this.props.repoUrl}
        linkButton={true} />
    );
  }
}

GithubButton.propTypes = {
  repoUrl: React.PropTypes.string
};

module.exports = GithubButton;
