'use strict';

const React = require('react');
const alt = require('../alt');
const assign = require('object.assign');

/**
 * 'Higher Order Component' that controls the props of the wrapped
 * component via stores.
 *
 * Expects the Component to have two static methods:
 *   - getStores(): Should return an array of stores.
 *   - getStateFromStores: Should return the state from the stores.
 */
const connectToStores = (Component) => {
  const stores = Component.getStores();

  class StoreConnection extends React.Component {
    constructor(props) {
      super(props);

      this.state = Component.getStateFromStores(props);
    }

    componentWillMount() {
      if (this.props.altStores) {
        alt.bootstrap(JSON.stringify(this.props.altStores));

        // force state update this render cycle
        this.setState(Component.getStateFromStores(this.props));
      }
    }

    componentDidMount() {
      stores.forEach(store => store.listen(this._onChange.bind(this)));
    }

    componentWillUnmount() {
      stores.forEach(store => store.unlisten(this._onChange.bind(this)));
    }

    _onChange() {
      this.setState(Component.getStateFromStores(this.props));
    }

    render() {
      return React.createElement(Component, assign({}, this.props, this.state));
    }
  }

  return StoreConnection;
};

module.exports = connectToStores;
