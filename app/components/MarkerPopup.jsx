'use strict';

const React = require('react');
const StyleSheet = require('react-style');

class MarkerPopup extends React.Component {
  _getStyles() {
    return StyleSheet.create({
      caption: {
        wordWrap: 'break-word',
      },
      img: {
        display: 'block',
        margin: 'auto',
      },
    });
  }

  render() {
    const styles = this._getStyles();

    return (
      <div>
        <a href={this.props.profileUrl} >
          <img src={this.props.imgUrl} styles={styles.img} />
        </a>
        <br/>
        <div styles={styles.caption}>{this.props.caption}</div>
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
