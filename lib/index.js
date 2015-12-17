'use strict';

const _ = require('lodash');
const Path = require('path');
const Stack = require('callsite');
const Files = require('./files');

exports.register = (server, options, next) => {

  server.expose({

    /**
     * Setup the routes via a glob pattern based on the plugins current directory
     * @param {String|Array<String>} routePatterns - pattern(s) of route discovery
     */
    setup(routePatterns) {

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
          server.route(require(file));
        });
      });
    }
  });

  return next();
};

exports.register.attributes = {
  pkg: require('../package')
};
