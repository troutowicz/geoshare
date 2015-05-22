import stampit from 'react-stampit';
import FlatButton from 'material-ui/lib/flat-button';

export default React => stampit(React, {
  displayName: 'FlowButton',

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    label: React.PropTypes.string,
    onTouchTap: React.PropTypes.func,
    style: React.PropTypes.object,
  },

  defaultProps: {
    label: 'Pause',
    style: {},
  },

  _getStyles() {
    const theme = this.context.muiTheme.component.flatButton;

    return {
      hoverColor: theme.hoverColor,
    };
  },

  render() {
    const styles = this._getStyles.call(this);

    return (
      <FlatButton
        {...this.props}
        hoverColor={styles.hoverColor}
      />
    );
  },
});
