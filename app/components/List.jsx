'use strict';

const React = require('react/addons');
const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

const ListItem = require('./ListItem');

class List extends React.Component {
  render() {
    return (
      <ul className='mui-list'>
        <ReactCSSTransitionGroup transitionName='list-item'>
          {this.props.itemData.map((obj) => {
            return (
              <ListItem
                icon={obj.user.profile_picture}
                title={obj.user.full_name}
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
