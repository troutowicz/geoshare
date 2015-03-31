'use strict';

const config = require('config');
const instagram = require('./instagram');
const db = require('./db');
const stats = require('../build/stats.json');
const renderApp = require('../build/prerender/main.js');

const tag = config.get('Instagram.tag');
const verifyToken = config.get('Instagram.verify_token');
const repoUrl = config.get('Github.repoUrl');

let requestCnt = 0;
let timeout = false;

const services = {
  index(request, reply) {
    const options = request.server.app.options;
    const publicPath = stats.publicPath;
    const styleUrl = options.separateStylesheet && (publicPath + 'main.css?' + stats.hash) || '';
    const scriptUrl = publicPath + [].concat(stats.assetsByChunkName.main)[0];
    const initData = {
      state: {
        AppStore: {
          timeout: timeout
        }
      },
      ctx: {
        tag: tag,
        repoUrl: repoUrl,
        loggedIn: request.auth.isAuthenticated
      }
    };

    renderApp(initData, scriptUrl, styleUrl, (err, html) => {
      return reply(html);
    });
  },

  auth(request, reply) {
    reply.redirect(instagram.getAuthUrl());
  },

  handleAuth(request, reply) {
    const client = request.server.app.client;

    instagram.handleAuth(request.query.code, (err, result) => {
      if (err) {
        return reply(err);
      }

      db.addUser(client, result, (err, user) => {
        if (err) {
          return reply(err);
        }

        instagram.addValidToken(user.access_token);

        request.auth.session.set(user);
        reply.redirect('/');
      });
    });
  },

  logout(request, reply) {
    request.auth.session.clear();

    reply.redirect('/');
  },

  handleSubscription(request, reply) {
    const io = request.server.app.io;
    const client = request.server.app.client;

    if (request.method === 'get' && request.query['hub.verify_token'] === verifyToken) {
      return reply(request.query['hub.challenge']);
    }

    // instagram provides 20 most recent
    if (++requestCnt === 20) {
      requestCnt = 0;

      const tokens = instagram.getValidTokens();
      if (tokens.length > 0) {
        timeout = false;

        instagram.getRecentMedia((err, medias, remaining) => {
          if (err) {
            if (err.error_type === 'OAuthAccessTokenException') {
              db.deleteUser(client, tokens[0], (err) => {
                if (err) {
                  console.log(err);
                } else {
                  instagram.removeToken();
                }
              });
            } else {
              console.log(err);
            }
          } else {
            instagram.emitImageMedia(medias, io);

            console.log('remaining: ' + remaining);
          }
        });
      } else {
        timeout = true;

        instagram.deleteSubscription((err) => {
          if (err) {
            console.log(err);
          }

          io.emit('data:timeout', true, true);
          // check for available tokens every 10 seconds
          instagram.recycleTokens(io, 10000);
        });
      }
    }

    return reply();
  }
};

module.exports = services;
