'use strict';

const React = require('react');

class MarkerPopup extends React.Component {
  render() {
    return (
      <div>
        <a href={this.props.profileUrl} >
          <img src={this.props.imgUrl} />
        </a>
        <br/>
        <div>{this.props.caption}</div>
      </div>
    );
  }
}

MarkerPopup.propTypes = {
  caption: React.PropTypes.string,
  imgUrl: React.PropTypes.string,
  profileUrl: React.PropTypes.string,
};

module.exports = MarkerPopup;
