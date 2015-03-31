'use strict';

const config = require('config');
const api = require('instagram-node').instagram();
const assign = require('object.assign');

const clientId = config.get('Instagram.client_id');
const clientSecret = config.get('Instagram.client_secret');
const redirectUri = config.get('Instagram.redirect_uri');
const subUri = config.get('Instagram.sub_uri');
const tag = config.get('Instagram.tag');
const verifyToken = config.get('Instagram.verify_token');

let apiTokens = {
  valid: [],
  expired: {}
};

let minTagId;

const wrapper = {
  setClientId() {
    api.use({
      client_id: clientId,
      client_secret: clientSecret
    });
  },

  setUserToken() {
    api.use({ access_token: apiTokens.valid[0] });
  },

  getAuthUrl() {
    this.setClientId();
    return api.get_authorization_url(redirectUri);
  },

  handleAuth(code, next) {
    this.setClientId();
    api.authorize_user(code, redirectUri, (err, result) => {
      if (err) {
        return next(err);
      }

      return next(null, result);
    });
  },

  addSubscription(next) {
    this.setClientId();
    api.add_tag_subscription(tag, subUri, {verify_token: verifyToken}, (err) => {
      if (err) {
        return next(err);
      }

      return next();
    });
  },

  deleteSubscription(next) {
    this.setClientId();
    api.del_subscription({ all: true }, (err) => {
      if (err) {
        return next(err);
      }

      return next();
    });
  },

  getRecentMedia(next) {
    this.setUserToken();
    api.tag_media_recent(tag, { min_tag_id: minTagId }, (err, medias, pagination, remaining) => {
      minTagId = pagination.min_tag_id;

      if (err) {
        return next(err);
      }

      return next(null, medias, remaining);
    });
  }
};

const instagram = {
  getValidTokens() {
    return apiTokens.valid;
  },

  setValidTokens(tokens) {
    apiTokens.valid = tokens;
  },

  addValidToken(token) {
    apiTokens.valid.push(token);
  },

  expireToken() {
    apiTokens.expired[Date.now() + 3600000] = apiTokens.valid.shift();
  },

  removeToken() {
    apiTokens.valid.shift();
  },

  recycleTokens(io, delay) {
    Object.keys(apiTokens.expired).forEach((timestamp) => {
      if (timestamp <= Date.now()) {
        apiTokens.valid.push(apiTokens.expired[timestamp]);
        delete apiTokens.expired[timestamp];
      }
    });

    if (apiTokens.valid.length > 0) {
      wrapper.addSubscription(() => {
        io.emit('data:timeout', false, true);
      });
    } else {
      setTimeout(() => {
        this.recycleTokens(io, delay);
      }.bind(this), delay);
    }
  },

  emitImageMedia(medias, io) {
    let data = [];

    medias.forEach((media) => {
      if (media.type === 'image' && media.location) {

        if (Object.keys(media.location).length === 2) {
          let caption = '';

          if (media.caption) {
            caption = media.caption.text;
          }

          data.unshift({
            id: media.id,
            user: media.user,
            latlng: [media.location.latitude, media.location.longitude],
            marker_popup: ' \
              <a href=https://instagram.com/' + media.user.username + ' > \
                <img src=' + media.images.thumbnail.url + ' /> \
              </a> \
              <br/> \
              <div>' + caption + '</div>'
          });
        }
      }
    });

    if (data.length > 0) {
      io.to('realtime').emit('data:add', data, true);
    }
  }
};

module.exports = assign(instagram, wrapper);
