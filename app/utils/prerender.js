'use strict';

const React = require('react');
const Iso = require('iso');
const getAppWithContext = require('./getAppWithContext');
const html = require('../index.html');

const prerender = (initData, scriptUrl, styleUrl, callback) => {
  const Component = React.createElement(getAppWithContext(initData));

  // format the full page
  callback(null, html
    .replace('STYLE_URL', styleUrl)
    .replace('SCRIPT_URL', scriptUrl)
    .replace(
      'CONTENT',
      Iso.render(
        React.renderToStaticMarkup(Component),
        initData,
        { react: true }
      )
    )
  );
};

module.exports = prerender;
