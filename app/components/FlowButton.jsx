'use strict';

const React = require('react');
const FlatButton = require('material-ui/lib/flat-button');

class FlowButton extends React.Component {
  _getStyles() {
    const theme = this.context.muiTheme.component.flatButton;

    return {
      hoverColor: theme.hoverColor
    };
  }

  render() {
    const styles = this._getStyles.call(this);

    return (
      <FlatButton
        {...this.props}
        hoverColor={styles.hoverColor}
      />
    );
  }
}

FlowButton.contextTypes = {
  muiTheme: React.PropTypes.object
};

FlowButton.propTypes = {
  label: React.PropTypes.string,
  onTouchTap: React.PropTypes.func,
  style: React.PropTypes.object
};

FlowButton.defaultProps = {
  label: 'Pause',
  style: {}
};

module.exports = FlowButton;
