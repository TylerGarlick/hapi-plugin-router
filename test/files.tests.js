'use strict';

const expect = require('code').expect;
const Files = require('../lib/files');
const _ = require('lodash');

describe('Files', () => {

  const path = __dirname;

  it('discovers files based on a directory', () => {
    const pattern = 'mocks/**/*';
    expect(Files.discover(path, pattern)).to.have.length(2);
  });

  it('discovers files based on the file name', () => {
    const pattern = 'mocks/*.route.js';
    expect(Files.discover(path, pattern)).to.have.length(1);
  });

  it('is empty when the pattern is incorrect', () => {
    const pattern = 'no-bueno/**/*';
    expect(Files.discover(path, pattern)).to.be.empty();
  });

  it('is empty when no path is provided', () => {
    const pattern = 'mocks/**/*';
    expect(Files.discover(null, pattern)).to.be.empty();
  });

  it('is empty when no path is provided', () => {
    expect(Files.discover(path)).to.be.empty();
  });

  it('contains the base directory with the filename', () => {
    const pattern = 'mocks/*.route.js';
    const file = _.first(Files.discover(path, pattern));
    expect(file).to.contain(__dirname);
  });

});
