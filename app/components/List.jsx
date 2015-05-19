'use strict';

import React from 'react';
import ListItem from './ListItem';
import ReactCSSTransitionGroup from './TimeoutTransitionGroup';
import { mergeAndPrefix } from '../utils/stylePropable';

class List extends React.Component {
  _getStyles() {
    return {
      root: {
        listStyleType: 'none',
        padding: '8px 0',
        margin: '0'
      },
      transition: {
        enter: {
          default: {
            opacity: '0.01',
            transition: 'opacity .3s ease-in'
          },
          active: {
            opacity: '1'
          }
        },
        leave: {
          default: {
            opacity: '1',
            transition: 'opacity .3s ease-in'
          },
          active: {
            opacity: '0.01'
          }
        }
      }
    };
  }

  render() {
    let styles = this._getStyles();

    return (
      <ul style={mergeAndPrefix(styles.root, this.props.style)}>
        <ReactCSSTransitionGroup
          enterTimeout={1000}
          leaveTimeout={0}
          style={styles.transition}
        >
          {this.props.itemData.map((obj) => {
            return (
              <ListItem
                icon={obj.user.profile_picture}
                title={obj.user.full_name.trim() || '-'}
                description={obj.user.username}
                onClick={this.props.onClick ? this.props.onClick.bind(null, obj) : undefined}
                key={obj.id}
              />
            );
          })}
        </ReactCSSTransitionGroup>
      </ul>
    );
  }
}

List.propTypes = {
  itemData: React.PropTypes.array,
  onClick: React.PropTypes.func,
  style: React.PropTypes.object
};

List.defaultProps = {
  style: {}
}

export default List;
