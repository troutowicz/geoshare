'use strict';

const React = require('react');
const Iso = require('iso');
const getAppWithContext = require('./getAppWithContext');
const html = require('../index.html');

module.exports = function (initData, scriptUrl, styleUrl, callback) {
  const node = React.createElement(getAppWithContext(initData));

  // format the full page
  callback(null, html
    .replace('STYLE_URL', styleUrl)
    .replace('SCRIPT_URL', scriptUrl)
    .replace(
      'CONTENT',
      Iso.render(
        React.renderToStaticMarkup(node),
        initData,
        { react: true }
      )
    )
  );
};
