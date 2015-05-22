import React from 'react';
import Iso from 'iso';
import wrapperFactory from '../components/Wrapper';

// webpack
import html from '../index.html';

const Wrapper = wrapperFactory(React);

export default (initData, scriptUrl, styleUrl, callback) => {
  const Component = React.createElement(Wrapper, { initData });

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
