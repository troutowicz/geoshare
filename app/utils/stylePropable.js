'use strict';

const autoPrefix = require('material-ui/lib/styles/auto-prefix');
const extend = require('material-ui/lib/utils/extend');

let stylePropable = {
  mergeAndPrefix() {
    const args = Array.prototype.slice.call(arguments, 0);
    let base = args[0];

    for (var i = 1; i < args.length; i++) {
      if (args[i]) {
        base = extend(base, args[i]);
      }
    }

    return autoPrefix.all(base);
  }
};

module.exports = stylePropable;
