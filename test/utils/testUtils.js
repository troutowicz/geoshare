/**
 * Monkey patch for React's test utils to
 * allow testing stamp components
 *
 * Patched upstream, remove when React 0.14 hits
 */

import React from 'react/addons';
import ReactInstanceMap from 'react/lib/ReactInstanceMap';

export default Object.assign(React.addons.TestUtils, {
  isCompositeComponentWithType(inst, type) {
    var internalInstance = ReactInstanceMap.get(inst);
    var constructor = internalInstance
      ._currentElement
      .type;

    return !!(this.isCompositeComponent(inst) &&
             (constructor === type));
  },
});
