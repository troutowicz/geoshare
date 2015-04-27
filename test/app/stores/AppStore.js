'use strict';

const assert = require('chai').assert;

const AppStore = require('../../../app/stores/AppStore');

describe('AppStore', function () {
  before(function () {
    this.UnwrappedStore = AppStore[Object.getOwnPropertySymbols(AppStore)[3]];
    this.defaultState = AppStore.getState();
  });

  afterEach(function () {
    this.UnwrappedStore.newImageData = this.defaultState.newImageData;
    this.UnwrappedStore.imageData = this.defaultState.imageData;
    this.UnwrappedStore.focusMarker = this.defaultState.focusMarker;
    this.UnwrappedStore.flow = this.defaultState.flow;
  });

  describe('onUpdateInstaData()', function () {
    it('should update relevant app state', function () {
      const data = ['foo', 'bar'];

      this.UnwrappedStore.onUpdateInstaData(data);
      assert.deepEqual(AppStore.getState().newImageData, data);
      assert.deepEqual(AppStore.getState().imageData, data);
      assert.deepEqual(AppStore.getState().focusMarker, {});

      assert.equal(AppStore.getState().flow, this.defaultState.flow);
    });
  });

  describe('onUpdateFocusedMarker()', function () {
    it('should update focusMarker state', function () {
      const data = 'foo';

      this.UnwrappedStore.onUpdateFocusedMarker(data);
      assert.equal(AppStore.getState().focusMarker, data);

      assert.deepEqual(AppStore.getState().newImageData, this.defaultState.newImageData);
      assert.deepEqual(AppStore.getState().imageData, this.defaultState.imageData);
      assert.equal(AppStore.getState().flow, this.defaultState.flow);
    });
  });

  describe('onUpdateFlowSuccess()', function () {
    it('should update flow state', function () {
      const newFlow = 'Pause';

      this.UnwrappedStore.onUpdateFlowSuccess(newFlow);
      assert.equal(AppStore.getState().flow, newFlow);

      assert.deepEqual(AppStore.getState().newImageData, this.defaultState.newImageData);
      assert.deepEqual(AppStore.getState().imageData, this.defaultState.imageData);
      assert.deepEqual(AppStore.getState().focusMarker, this.defaultState.focusMarker);
    });
  });
});
