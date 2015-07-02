import stampit from 'react-stampit';

import listItemFactory from './ListItem';
import reactCSSTransitionGroupFactory from './TimeoutTransitionGroup';
import { mergeAndPrefix } from '../utils/stylePropable';

export default React => {
  const ListItem = listItemFactory(React);
  const ReactCSSTransitionGroup = reactCSSTransitionGroupFactory(React);

  return stampit(React, {
    displayName: 'List',

    propTypes: {
      itemData: React.PropTypes.array,
      onClick: React.PropTypes.func,
      style: React.PropTypes.object,
    },

    defaultProps: {
      style: {},
    },

    _getStyles() {
      return {
        root: {
          listStyleType: 'none',
          padding: '8px 0',
          margin: '0',
        },
        transition: {
          enter: {
            default: {
              opacity: '0.01',
              transition: 'opacity .3s ease-in',
            },
            active: {
              opacity: '1',
            },
          },
          leave: {
            default: {
              opacity: '1',
              transition: 'opacity .3s ease-in',
            },
            active: {
              opacity: '0.01',
            },
          },
        },
      };
    },

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
                  description={obj.user.username}
                  icon={obj.user.profile_picture}
                  key={obj.id}
                  onClick={this.props.onClick ? this.props.onClick.bind(null, obj) : undefined}
                  title={obj.user.full_name.trim() || '-'}
                />
              );
            })}
          </ReactCSSTransitionGroup>
        </ul>
      );
    },
  });
};
