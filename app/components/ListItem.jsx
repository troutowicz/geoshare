'use strict';

import React from 'react';
import typography from 'material-ui/lib/styles/typography';
import { ListDivider, ListItem } from 'material-ui/lib/lists';
import ListItemAvatar from './ListItemAvatar';
import { mergeAndPrefix } from '../utils/stylePropable';

export default class extends React.Component {
  static contextTypes = {
    muiTheme: React.PropTypes.object,
  };

  static propTypes = {
    description: React.PropTypes.string,
    icon: React.PropTypes.string,
    onClick: React.PropTypes.func,
    primaryText: React.PropTypes.string,
  };

  static defaultProps = {
    description: '',
    primaryText: '',
  };

  _getStyles() {
    const theme = this.context.muiTheme.component.listItem;

    return {
      primaryText: {
        fontSize: '0.8em',
        fontWeight: typography.fontWeightMedium,
        color: theme.color,
      },
      description: {
        marginTop: '-4px',
        fontSize: '0.75em',
        color: theme.color,
      },
      divider: {
        backgroundColor: theme.borderColor,
        paddingTop: '0.1px',
      },
      overflow: {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        width: '190px',
        display: 'inline-block',
        whiteSpace: 'nowrap',
      },
    };
  }

  render() {
    const styles = this._getStyles();
    /* eslint-disable */
    const {
      description,
      icon,
      primaryText,
      onClick,
      ...other
    } = this.props;
    /* eslint-enable */

    return (
      <div onClick={onClick}>
        <ListItem
          {...other}
          leftAvatar={<ListItemAvatar className='icon' src={icon} />}
          primaryText={
            <div dangerouslySetInnerHTML={{__html: primaryText}} style={mergeAndPrefix(styles.overflow, styles.primaryText)}></div>
          }
          secondaryText={
            <div className='content' dangerouslySetInnerHTML={{__html: description}} style={mergeAndPrefix(styles.overflow, styles.description)} ></div>
          }
        />
        <ListDivider className='border-bottom' inset={true} style={styles.divider} />
      </div>
    );
  }
}
