'use strict';

require('babel/polyfill');

module.exports = (options) => {
  const Hapi = require('hapi');
  const SocketIO = require('socket.io');
  const Redis = require('redis');
  const config = require('config');
  const services = require('./lib/services');
  const db = require('./lib/db');
  const instagram = require('./lib/instagram');

  const server = new Hapi.Server();

  server.connection({
    host: config.get('Web.host'),
    port: config.get('Web.port')
  });

  server.register([
    {
      register: require('hapi-auth-cookie')
    },
    {
      register: require('good'),
      options: {
        reporters: [{
          reporter: require('good-console'),
          events: { log: '*' }
        }]
      }
    },
    {
      register: require('hapi-shutdown'),
      options: {
        serverSpindownTime: 10000
      }
    }],
    err => {
      if (err) {
        throw err;
      }

      server.auth.strategy('session', 'cookie', {
        password: config.get('Web.cookie'),
        cookie: 'sid',
        isSecure: false,
        clearInvalid: true
      });
    }
  );

  server.route({
    method: 'GET',
    path: '/public/{path*}',
    handler: {
      directory: {
        path: 'build/public',
        listing: false
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/',
    config: {
      handler: services.index,
      auth: {
        strategy: 'session',
        mode: 'try'
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/auth',
    handler: services.auth
  });

  server.route({
    method: 'GET',
    path: '/handleauth',
    config: {
      handler: services.handleAuth,
      auth: {
        strategy: 'session',
        mode: 'try'
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/logout',
    handler: services.logout
  });

  server.route({
    method: ['GET', 'POST'],
    path: '/ig',
    handler: services.handleSubscription
  });

  server.start(() => {
    server.log('info', 'Server running at: ' + server.info.uri);

    const io = SocketIO.listen(server.listener);
    server.app.options = options;
    server.app.io = io;

    server.plugins['hapi-shutdown'].register(
      {
        taskname: 'shutdown',
        task: () => {
          instagram.deleteSubscription((err) => {
            if (err) {
              throw err;
            }
          });
        },
        timeout: 2000
      }
    );

    io.on('connection', socket => {
      server.log('info', 'Client connected to local socket');

      socket.join('realtime');

      socket.on('flow:pause', (callback) => {
        socket.leave('realtime');

        return callback();
      });

      socket.on('flow:start', (callback) => {
        socket.join('realtime');

        return callback();
      });

      socket.on('disconnect', () => socket.leave('realtime'));
    });

    if (options.testData) {
      let counter = 1;
      setInterval (() => {
        let data = {
          id: counter,
          latlng: [Math.random() * 180 - 90, Math.random() * 360 - 180],
          user: {
            profile_picture: '/public/user.jpg',
            full_name: 'User ' + counter,
            username: 'user' + counter
          },
          marker_popup: '<div>description ' + counter + '</div>'
        };

        io.to('realtime').emit('data:add', [data], true);

        counter++;
      }, 1000);
    } else {
      const client = Redis.createClient();
      server.app.client = client;

      db.getTokens(client, (err, tokens) => {
        if (err) {
          throw err;
        }

        instagram.setValidTokens(tokens);
        instagram.addSubscription((err) => {
          if (err) {
            throw err;
          }
        });
      });

      client.on('connect', () => server.log('info', 'Redis connection established'));
      client.on('error', () => server.log('error', 'Redis connection error'));
      client.on('end', () => server.log('error', 'Redis not running'));
    }
  });
};
