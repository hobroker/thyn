/* eslint-disable */

process.env.DEBUG = [process.env.DEBUG || '', 'oxium*,thyn*'].join(',');

require = require('esm')(module);

module.exports = require('./main');
