/* eslint-disable */

process.env.DEBUG = 'oxium*,thyn*';

require = require('esm')(module);

module.exports = require('./main');
