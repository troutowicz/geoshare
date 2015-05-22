import React from 'react';
import Iso from 'iso';
import wrapperFactory from './components/Wrapper';

const Wrapper = wrapperFactory(React);

require('babel/polyfill');

Iso.on('react', true, function (initData, _, node) {
  React.render(React.createElement(Wrapper, { initData }), node);
});
