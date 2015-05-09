'use strict';

import rewire from 'rewire';
import sinon from 'sinon';
import { assert } from 'chai';

const AppActions = rewire('../../../app/actions/AppActions');

describe('AppActions', function () {
  describe('updateFlow()', function () {
    beforeEach(function () {
      const socket = {
        emit() {},
      };

      this.emit = sinon.stub(socket, 'emit').yields();
      this.flowSuccessAction = sinon.stub(AppActions, 'updateFlowSuccess').returns(true);
      this.restoreSocket = AppActions.__set__('socket', socket);
    });

    afterEach(function () {
      this.emit.restore();
      this.flowSuccessAction.restore();
      this.restoreSocket();
    });

    it('should emit to correct event', function () {
      this.emit.withArgs('flow:pause');
      this.emit.withArgs('flow:start');

      AppActions.updateFlow('Pause');
      assert.ok(this.emit.withArgs('flow:pause').calledOnce);

      AppActions.updateFlow('Resume');
      assert.ok(this.emit.withArgs('flow:start').calledOnce);
    });

    it('should fire setFlow action', function () {
      AppActions.updateFlow('Pause');
      assert.ok(this.flowSuccessAction.called);
    });
  });
});
