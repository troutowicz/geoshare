'use strict';

const assert = require('chai').assert;
const sinon = require('sinon');
const rewire = require('rewire');

const AppActions = rewire('../../../app/actions/AppActions');

describe('AppActions', function () {
  describe('flow()', function () {
    beforeEach(function () {
      const socket = {
        emit() {}
      };

      this.emit = sinon.stub(socket, 'emit').yields();
      this.flowSuccessAction = sinon.stub(AppActions, 'flowSuccess').returns(true);
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

      AppActions.flow('Pause');
      assert.ok(this.emit.withArgs('flow:pause').calledOnce);

      AppActions.flow('Resume');
      assert.ok(this.emit.withArgs('flow:start').calledOnce);
    });

    it('should fire setFlow action', function () {
      AppActions.flow('Pause');
      assert.ok(this.flowSuccessAction.called);
    });
  });
});
