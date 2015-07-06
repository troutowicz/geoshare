'use strict';

import React from 'react';
import typography from 'material-ui/lib/styles/typography';
import {
  ListDivider,
  ListItem,
} from 'material-ui';
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
    title: React.PropTypes.string,
  };

  static defaultProps = {
    description: '',
    title: '',
  };

  _getStyles() {
    const theme = this.context.muiTheme.component.listItem;

    return {
      title: {
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
      onClick,
      title,
      ...other
    } = this.props;
    /* eslint-enable */

    return (
      <div onClick={onClick}>
        <ListItem
          {...other}
          leftAvatar={<ListItemAvatar className='icon' src={icon} />}
          secondaryText={
            <div className='content' dangerouslySetInnerHTML={{__html: description}} style={mergeAndPrefix(styles.overflow, styles.description)} ></div>
          }
        >
          <span dangerouslySetInnerHTML={{__html: title}} style={mergeAndPrefix(styles.overflow, styles.title)}></span>
        </ListItem>
        <ListDivider className='border-bottom' inset={true} style={styles.divider} />
      </div>
    );
  }
}
