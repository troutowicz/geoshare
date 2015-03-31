'use strict';

const React = require('react');
const { IconButton } = require('material-ui');

module.exports = React.createClass ({
  propTypes: {
    repoUrl: React.PropTypes.string
  },

  render() {
    return (
      <IconButton
        iconClassName='mui-icon-github'
        href={this.props.repoUrl}
        linkButton={true} />
    );
  }
});
