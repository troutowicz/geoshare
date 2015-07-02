import stampit from 'react-stampit';

export default React => stampit(React, {
  displayName: 'MarkerPopup',

  propTypes: {
    caption: React.PropTypes.string,
    imgUrl: React.PropTypes.string,
    profileUrl: React.PropTypes.string,
  },

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
  },

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
  },
});
