import config from 'config';
import { instagram as instaApi } from 'instagram-node';

const api = instaApi();
const clientId = config.get('Instagram.client_id');
const clientSecret = config.get('Instagram.client_secret');
const redirectUri = config.get('Instagram.redirect_uri');
const subUri = config.get('Instagram.sub_uri');
const tag = config.get('Instagram.tag');
const verifyToken = config.get('Instagram.verify_token');

let apiTokens = {
  valid: [],
  expired: {},
};
let minTagId;
let busy = false;


export function setClientId() {
  api.use({
    /* eslint-disable */
    client_id: clientId,
    client_secret: clientSecret,
    /* eslint-enable */
  });
}

export function setUserToken() {
  /* eslint-disable */
  api.use({ access_token: apiTokens.valid[0] });
  /* eslint-enable */
}

export function getAuthUrl() {
  setClientId();
  return api.get_authorization_url(redirectUri);
}

export function handleAuth(code, next) {
  setClientId();
  api.authorize_user(code, redirectUri, (err, result) => {
    if (err) {
      return next(err);
    }

    return next(null, result);
  });
}

export function addSubscription(next) {
  setClientId();
  /* eslint-disable */
  api.add_tag_subscription(tag, subUri, {verify_token: verifyToken}, (err) => {
  /* eslint-enable */
    if (err) {
      return next(err);
    }

    return next();
  });
}

export function deleteSubscription(next) {
  setClientId();
  api.del_subscription({ all: true }, (err) => {
    if (err) {
      return next(err);
    }

    return next();
  });
}

export function getRecentMedia(next) {
  if (busy) {
    return next();
  }

  busy = true;

  setUserToken();
  /* eslint-disable */
  api.tag_media_recent(tag, { min_tag_id: minTagId }, (err, medias, pagination, remaining) => {
  /* eslint-enable */
    busy = false;

    if (err) {
      return next(err);
    }

    // Instagram pagination obj is inconsistent
    if (!pagination) {
      return next();
    }

    minTagId = pagination.min_tag_id;

    return next(null, medias, remaining);
  });
}

export function getValidTokens() {
  return apiTokens.valid;
}

export function setValidTokens(tokens) {
  apiTokens.valid = tokens;
}

export function addValidToken(token) {
  apiTokens.valid.push(token);
}

export function expireToken() {
  apiTokens.expired[Date.now() + 3600000] = apiTokens.valid.shift();
}

export function removeToken() {
  apiTokens.valid.shift();
}

export function recycleTokens(io, delay) {
  Object.keys(apiTokens.expired).forEach((timestamp) => {
    if (timestamp <= Date.now()) {
      apiTokens.valid.push(apiTokens.expired[timestamp]);
      delete apiTokens.expired[timestamp];
    }
  });

  if (apiTokens.valid.length > 0) {
    addSubscription(() => {
      io.emit('data:timeout', false, true);
    });
  } else {
    setTimeout(() => {
      recycleTokens(io, delay);
    }, delay);
  }
}

export function emitImageMedia(medias, io) {
  let data = [];

  medias.forEach((media) => {
    if (media.type === 'image' && media.location) {

      if (Object.keys(media.location).length === 2) {
        let caption = '';

        if (media.caption) {
          caption = media.caption.text;
        }

        data.unshift({
          caption,
          id: media.id,
          imgUrl: media.images.thumbnail.url,
          latLng: [media.location.latitude, media.location.longitude],
          profileUrl: `https://instagram.com/${media.user.username}`,
          user: media.user,
        });
      }
    }
  });

  if (data.length > 0) {
    io.to('realtime').emit('data:add', data, true);
  }
}
