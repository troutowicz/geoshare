'use strict';

const React = require('react');
const { Paper } = require('material-ui');

class ListItem extends React.Component {
  render() {
    return (
      <li className='mui-list-item' onClick={this.props.onClick} >
        <div className='icon'>
          <Paper className='mui-paper' zDepth={0} circle={true} >
            <img src={this.props.icon} />
          </Paper>
        </div>
        <div className='content'>
          <div className='title' dangerouslySetInnerHTML={{__html: this.props.title}}></div>
          <div className='description' dangerouslySetInnerHTML={{__html: this.props.description}}></div>
        </div>
        <div className='border-bottom' />
      </li>
    );
  }
}

ListItem.propTypes = {
  icon: React.PropTypes.string,
  title: React.PropTypes.string,
  description: React.PropTypes.string,
  onClick: React.PropTypes.func
};

ListItem.defaultProps = {
  title: '',
  description: ''
};

module.exports = ListItem;
