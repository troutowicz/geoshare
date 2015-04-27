'use strict';

const React = require('react/addons');
const ListItem = require('./ListItem');
const ReactCSSTransitionGroup = require('./TimeoutTransitionGroup');

class List extends React.Component {
  render() {
    return (
      <ul className='mui-list'>
        <ReactCSSTransitionGroup
          transitionName='list-item'
          enterTimeout={1000}
          leaveTimeout={0}
        >
          {this.props.itemData.map((obj) => {
            return (
              <ListItem
                icon={obj.user.profile_picture}
                title={obj.user.full_name.trim() || '-'}
                description={obj.user.username}
                onClick={this.props.onClick.bind(null, obj)}
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
  onClick: React.PropTypes.func
};

List.defaultProps = {
  itemData: [],
  onClick() {}
};

module.exports = List;
