'use strict';

const assert = require('chai').assert;
const sinon = require('sinon');
const rewire = require('rewire');

const instagram = rewire('../../lib/instagram');

describe('instagram lib', function () {
  beforeEach(function () {
    this.tokens = {
      valid: [],
      expired: {}
    };
  });

  afterEach(function () {
    instagram.__set__('apiTokens', { valid: [], expired: {} });
  });

  describe('getValidTokens()', function () {
    it('should return all valid tokens', function () {
      this.tokens.valid.push('abc123');
      instagram.__set__('apiTokens', this.tokens);

      const validTokens = instagram.getValidTokens();
      assert.equal(validTokens, this.tokens.valid);
    });
  });

  describe('setValidTokens()', function () {
    it('should set valid tokens', function () {
      this.tokens.valid.push('abc123');

      instagram.setValidTokens(this.tokens.valid);
      assert.lengthOf(instagram.__get__('apiTokens').valid, 1);
    });
  });

  describe('addValidToken()', function () {
    it('should add valid token', function () {
      const token = 'abc123';

      instagram.addValidToken(token);
      assert.lengthOf(instagram.__get__('apiTokens').valid, 1);
    });
  });

  describe('expireToken()', function () {
    it('should expire current valid token', function () {
      this.tokens.valid.push('abc123');
      instagram.__set__('apiTokens', this.tokens);

      instagram.expireToken();
      const tokens = instagram.__get__('apiTokens');
      const expiredTokenKeys = Object.keys(this.tokens.expired);

      assert.lengthOf(tokens.valid, 0);
      assert.lengthOf(expiredTokenKeys, 1);
    });
  });

  describe('removeToken()', function () {
    it('should remove current token', function () {
      this.tokens.valid.push('abc123');
      instagram.__set__('apiTokens', this.tokens);

      instagram.removeToken();
      const tokens = instagram.__get__('apiTokens');

      assert.lengthOf(tokens.valid, 0);
    });
  });

  describe('recycleTokens()', function () {
    it('should unexpire applicable tokens', function () {
      const stub = sinon.stub().returns(true);
      const restoreAddSubscription = instagram.__set__('wrapper.addSubscription', stub);
      this.tokens.valid.push('abc123');
      this.tokens.expired[Date.now()] = 'def456';
      this.tokens.expired[Date.now() + 1000] = 'ghi789';

      instagram.__set__('apiTokens', this.tokens);
      instagram.recycleTokens();

      const apiTokens = instagram.__get__('apiTokens');
      assert.lengthOf(Object.keys(apiTokens.expired), 1);
      assert.lengthOf(apiTokens.valid, 2);
      assert.ok(stub.calledOnce);
      restoreAddSubscription();
    });

    it('should retry when no tokens get validated', function () {
      const stub = sinon.stub().returns(true);
      const restoreSetTimeout = instagram.__set__('setTimeout', stub);
      this.tokens.expired[Date.now() + 1000] = 'abc123';

      instagram.__set__('apiTokens', this.tokens);
      instagram.recycleTokens();

      const apiTokens = instagram.__get__('apiTokens');
      assert.lengthOf(Object.keys(apiTokens.expired), 1);
      assert.lengthOf(apiTokens.valid, 0);
      assert.ok(stub.calledOnce);
      restoreSetTimeout();
    });
  });

  describe('emitImageMedia()', function () {
    beforeEach(function() {
      this.io = {
        to() { return this; },
        emit() { return true; }
      };

      this.emit = sinon.spy(this.io, 'emit');
    });

    afterEach(function() {
      this.emit.restore();
    });

    it('should emit media of type image with location', function () {
      const medias = [
        {
          type: 'image',
          location: {
            latitude: 0,
            longitude: 0
          },
          id: '1',
          user: {
            username: 'someone'
          },
          images: {
            thumbnail: {
              url: 'localhost/i.png'
            }
          }
        }
      ];

      instagram.emitImageMedia(medias, this.io);
      assert.ok(this.emit.calledOnce);
    });

    it('should not emit media of type image without location', function () {
      const medias = [
        {
          type: 'image'
        }
      ];

      instagram.emitImageMedia(medias, this.io);
      assert.notOk(this.emit.called);
    });

    it('should not emit media of type non-image', function () {
      const medias = [
        {
          type: 'video',
          location: {
            latitude: 0,
            longitude: 0
          }
        }
      ];

      instagram.emitImageMedia(medias, this.io);
      assert.notOk(this.emit.called);
    });
  });
});
