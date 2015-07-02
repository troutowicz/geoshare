import config from 'config';
import Hapi from 'hapi';
import Redis from 'redis';
import * as services from './lib/services';
import SocketIO from 'socket.io';
import { getTokens } from './lib/db';
import {
  addSubscription,
  deleteSubscription,
  setValidTokens
} from './lib/instagram';

const server = new Hapi.Server();

export default (options) => {
  server.connection({
    host: config.get('Web.host'),
    port: config.get('Web.port'),
  });

  server.register(
    [
      {
        register: require('hapi-auth-cookie'),
      },
      {
        register: require('good'),
        options: {
          reporters: [
            {
              reporter: require('good-console'),
              events: { log: '*' },
            },
          ],
        },
      },
      {
        register: require('hapi-shutdown'),
        options: {
          serverSpindownTime: 10000,
        },
      },
    ],
    err => {
      if (err) {
        throw err;
      }

      server.auth.strategy('session', 'cookie', {
        password: config.get('Web.cookie'),
        cookie: 'sid',
        isSecure: false,
        clearInvalid: true,
      });
    }
  );

  server.route({
    method: 'GET',
    path: '/public/{path*}',
    handler: {
      directory: {
        path: 'build/public',
        listing: false,
      },
    },
  });

  server.route({
    method: 'GET',
    path: '/',
    config: {
      handler: services.index,
      auth: {
        strategy: 'session',
        mode: 'try',
      },
    },
  });

  server.route({
    method: 'GET',
    path: '/auth',
    handler: services.auth,
  });

  server.route({
    method: 'GET',
    path: '/handleauth',
    config: {
      handler: services.handleAuth,
      auth: {
        strategy: 'session',
        mode: 'try',
      },
    },
  });

  server.route({
    method: 'GET',
    path: '/logout',
    handler: services.logout,
  });

  server.route({
    method: ['GET', 'POST'],
    path: '/ig',
    handler: services.handleSubscription,
  });

  server.start(() => {
    server.log('info', `Server running at: ${server.info.uri}`);

    const io = SocketIO.listen(server.listener);
    server.app.options = options;
    server.app.io = io;

    server.plugins['hapi-shutdown'].register(
      {
        taskname: 'shutdown',
        task() {
          deleteSubscription((err) => {
            if (err) {
              throw err;
            }
          });
        },
        timeout: 2000,
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
      setInterval(() => {
        let data = {
          caption: `description ${counter}`,
          id: counter,
          latLng: [Math.random() * 180 - 90, Math.random() * 360 - 180],
          user: {
            /* eslint-disable */
            profile_picture: '/public/user.jpg',
            full_name: `User ${counter}`,
            /* eslint-enable */
            username: `user ${counter}`,
          },
        };

        io.to('realtime').emit('data:add', [data], true);

        counter++;
      }, 1000);
    } else {
      const client = Redis.createClient();
      server.app.client = client;

      getTokens(client, (err, tokens) => {
        if (err) {
          throw err;
        }

        setValidTokens(tokens);
        addSubscription((err) => {
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
