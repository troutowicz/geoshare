'use strict';

import React from 'react';

class MarkerPopup extends React.Component {
  _getStyles() {
    return {
      caption: {
        wordWrap: 'break-word',
      },
      img: {
        display: 'block',
        margin: 'auto',
      },
    };
  }

  render() {
    const styles = this._getStyles();

    return (
      <div>
        <a href={this.props.profileUrl} >
          <img src={this.props.imgUrl} style={styles.img} />
        </a>
        <br/>
        <div style={styles.caption}>{this.props.caption}</div>
      </div>
    );
  }
}

MarkerPopup.propTypes = {
  caption: React.PropTypes.string,
  imgUrl: React.PropTypes.string,
  profileUrl: React.PropTypes.string,
};

export default MarkerPopup;
