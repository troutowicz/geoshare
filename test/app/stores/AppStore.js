'use strict';

import alt from '../../../app/alt';
import AppActions from '../../../app/actions/AppActions';
import AppStore from '../../../app/stores/AppStore';
import { assert } from 'chai';

describe('AppStore', function () {
  before(function () {
    this.defaultState = AppStore.getState();
  });

  afterEach(function () {
    alt.recycle();
  });

  describe('onUpdateInstaData()', function () {
    it('should update relevant app state', function () {
      const data = ['foo', 'bar'];
      const action = AppActions.UPDATE_INSTA_DATA;

      alt.dispatcher.dispatch({ action, data });
      assert.deepEqual(AppStore.getState().newImageData, data);
      assert.deepEqual(AppStore.getState().imageData, data);
      assert.deepEqual(AppStore.getState().focusMarker, {});
      assert.equal(AppStore.getState().flow, this.defaultState.flow);
    });
  });

  describe('onUpdateFocusedMarker()', function () {
    it('should update focusMarker state', function () {
      const data = 'foo';
      const action = AppActions.UPDATE_FOCUSED_MARKER;

      alt.dispatcher.dispatch({ action, data });
      assert.equal(AppStore.getState().focusMarker, data);
      assert.deepEqual(AppStore.getState().newImageData, this.defaultState.newImageData);
      assert.deepEqual(AppStore.getState().imageData, this.defaultState.imageData);
      assert.equal(AppStore.getState().flow, this.defaultState.flow);
    });
  });

  describe('onUpdateFlowSuccess()', function () {
    it('should update flow state', function () {
      const data = 'Resume';
      const action = AppActions.UPDATE_FLOW_SUCCESS;

      alt.dispatcher.dispatch({ action, data });
      assert.equal(AppStore.getState().flow, data);
      assert.deepEqual(AppStore.getState().newImageData, this.defaultState.newImageData);
      assert.deepEqual(AppStore.getState().imageData, this.defaultState.imageData);
      assert.deepEqual(AppStore.getState().focusMarker, this.defaultState.focusMarker);
    });
  });
});
