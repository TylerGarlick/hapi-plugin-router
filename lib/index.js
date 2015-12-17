'use strict';

const _ = require('lodash');
const Path = require('path');
const Stack = require('callsite');
const Files = require('./files');

exports.register = (server, settings, next) => {

  server.expose({

    /**
     * Setup the routes via a glob pattern based on the plugins current directory
     * @param {String|Array<String>} routePatterns - pattern(s) of route discovery
     * @param {Object} [options]
     * @param {String} [options.cwd] - Allow the basepath to be whatever you want it to be, and the glob to operate from the base path.
     */
    setup(routePatterns, options) {
      options = options || {};

      const stack = Stack();
      if (!_.isArray(routePatterns)) {
        routePatterns = [routePatterns];
      }

      let cwd = options.cwd;
      if (!cwd) {
        const caller = stack[1];
        if (caller) {
          cwd = Path.dirname(caller.getFileName());
        }
      }

      cwd = cwd || process.cwd();

      routePatterns.forEach((pattern) => {
        const files = Files.discover(cwd, pattern);
        files.forEach((file) => {
          let routeModule = require(file);
          if (!_.isArray(routeModule)) {
            routeModule = [routeModule];
          }
          routeModule.forEach((route) => {
            server.route(route);
          });
        });
      });
    }
  });

  return next();
};

exports.register.attributes = {
  pkg: require('../package')
};
