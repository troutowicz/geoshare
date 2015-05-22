import * as db from '../../lib/db';
import sinon from 'sinon';
import { assert } from 'chai';

describe('db lib', function () {
  describe('addUser()', function () {
    before(function () {
      this.client = {
        sismember() {},
        hgetall() {},
        hmset() {},
        sadd() {},
      };

      /* eslint-disable */
      this.data = {
        user: {
          id: 1,
          username: 'troutowicz',
          full_name: 'Tim Routowicz',
          profile_picture: 'localhost/me.png',
        },
        access_token: '12345',
      };

      this.testUser = {
        id: 1,
        username: 'troutowicz',
        full_name: 'Tim Routowicz',
        profile_picture: 'localhost/me.png',
        access_token: '12345',
      };
      /* eslint-enable */
    });

    it('should return user object when user found in db', function (done) {
      const client = {
        sismember() {},
        hgetall() {},
      };

      sinon.stub(client, 'sismember').yields(null, true);
      sinon.stub(client, 'hgetall').yields(null, this.testUser);

      db.addUser(client, this.data, (err, user) => {
        assert.isNull(err);
        assert.deepEqual(this.testUser, user);

        done();
      });
    });

    it('should return new user object when user added to db', function (done) {
      const client = {
        sismember() {},
        hmset() {},
        sadd() {},
      };

      sinon.stub(client, 'sismember').yields(null, false);
      sinon.stub(client, 'hmset').yields(null);
      sinon.stub(client, 'sadd').returns(true);

      db.addUser(client, this.data, (err, user) => {
        assert.isNull(err);
        assert.deepEqual(this.testUser, user);

        done();
      });
    });
  });

  describe('deleteUser()', function () {
    it('should return true on deletion from db', function (done) {
      const token = '12345';
      const client = {
        del() {},
        srem() {},
      };

      sinon.stub(client, 'del').yields(null);
      sinon.stub(client, 'srem').returns(true);

      db.deleteUser(client, token, (err) => {
        assert.ok(!err);

        done();
      });
    });
  });

  describe('getTokens()', function () {
    it('should return tokens object', function (done) {
      const client = {
        smembers() {},
      };

      sinon.stub(client, 'smembers').yields(null, {});

      db.getTokens(client, (err, tokens) => {
        assert.isNull(err);
        assert.deepEqual({}, tokens);

        done();
      });
    });
  });
});
