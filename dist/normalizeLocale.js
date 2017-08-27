'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

/**
 * @private
 * @type {String}
 */
var SPECIAL_CHARS = '._-/\\';

/**
 * @param {String} locale
 * @returns {String}
 */

exports.default = function (locale) {
  return (0, _lodash.trim)(locale, SPECIAL_CHARS);
};
//# sourceMappingURL=normalizeLocale.js.map