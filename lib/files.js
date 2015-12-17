'use strict';

const Glob = require('glob');
const Path = require('path');
const _ = require('lodash');

module.exports = {

  /**
   * Discover files based on the path and glob pattern.  The result will contain the fully qualified file.
   *
   * @param {String} path - the starting path
   * @param {String} pattern - the glob pattern of file discovery
   *
   * @returns {Array<String>}
   */
  discover(path, pattern) {
    if (_.isEmpty(path) || _.isEmpty(pattern)) return [];

    return Glob.sync(pattern, { cwd: path, nodir: true, strict: true }).map((file) => {
      return Path.join(path, file);
    });
  }
};
