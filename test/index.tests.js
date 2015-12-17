'use strict';

const expect = require('code').expect;
const Hapi = require('hapi');
const _ = require('lodash');

describe('hapi-plugin-router', () => {

  const plugin = 'hapi-plugin-router';

  let server;
  beforeEach((done) => {
    server = new Hapi.Server();
    server.connection();
    server.register([require('../')], (err) => {
      if (err) return done(err);
      done();
    });
  });

  afterEach((done) => {
    server.stop((err) => {
      if (err) return done(err);
      done();
    });
  });

  describe('loads properly', () => {
    it('plugin is loaded', () => {
      expect(server.plugins[plugin]).to.be.ok;
    });
  });

  describe('#setup(routePattern)', () => {

    it('exposes a setup function', () => {
      expect(server.plugins[plugin].setup).to.be.a.function();
    });

    it('sets up the routes correctly', () => {
      const routePath = '/some/path';
      expect(_.first(server.table()).table).to.be.empty();

      server.plugins[plugin].setup('mocks/get.js');
      expect(_.first(_.first(server.table()).table).fingerprint).to.be.equal(routePath);
    });
  });
});
