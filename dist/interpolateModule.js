'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _interpolateOptionsValue = require('./interpolateOptionsValue');

var _interpolateOptionsValue2 = _interopRequireDefault(_interpolateOptionsValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @private
 * @param {*} loaderContext
 * @param {*} content
 * @param {Object} options
 * @returns {String}
 */
exports.default = function (loaderContext, content, options) {
  return (0, _interpolateOptionsValue2.default)('module', loaderContext, content, options);
};
//# sourceMappingURL=interpolateModule.js.map