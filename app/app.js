'use strict';

import React from 'react';
import Iso from 'iso';
import Wrapper from './components/Wrapper';

require('babel/polyfill');

Iso.on('react', true, function (initData, _, node) {
  React.render(React.createElement(Wrapper, { initData }), node);
});
