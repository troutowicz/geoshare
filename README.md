[![Build Status](https://travis-ci.org/troutowicz/geoshare.svg)](https://travis-ci.org/troutowicz/geoshare) [![Dependencies](https://david-dm.org/troutowicz/geoshare.svg)](https://david-dm.org/troutowicz/geoshare)

# geoshare
> View tag filtered instagram images in real time

geoshare is a modern, isomorphic javascript application. The frontend is built with [React](https://facebook.github.io/react/) and [alt](http://goatslacker.github.io/alt/) (a [flux](https://facebook.github.io/flux/) implementation). The backend uses [Redis](http://redis.io/) for storing relevant instagram data, and [socket.io](http://socket.io/) for real-time bidirectional communication with clients. The project uses [webpack](http://webpack.github.io/) for bundling modules and [webpack-dev-server](http://webpack.github.io/docs/webpack-dev-server.html) for [hot reloading](http://gaearon.github.io/react-hot-loader/) during development. geoshare is forward thinking, using [iojs](https://iojs.org) and the [ES6](https://github.com/lukehoban/es6features) spec where possible.

## Config
There is default configuration to simplify development. The config file is located at `config/default.json5`. For local configuration, create `config/local.json5` and that file's configuration will take precedence over `config/default.json5`. The local file will not be tracked by git.

## Development
geoshare has a dev environment and any contributions are welcome! The dev environment uses two webservers, the webpack dev server (hot reloading) and the dev app.

```sh
npm run dev-server
npm run dev
```

## Production
Make sure to set all instagram related config options. Read more about this setup [here](https://instagram.com/developer/realtime/).

```sh
npm run build
npm run prod
```

## Tests
```sh
npm run test
```

## License

[![MIT](https://img.shields.io/badge/license-MIT-blue.svg)](http://troutowicz.mit-license.org)
