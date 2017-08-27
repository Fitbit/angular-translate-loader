'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require('lodash');

var _loaderUtils = require('loader-utils');

var _defaultOptions = require('./defaultOptions');

var _defaultOptions2 = _interopRequireDefault(_defaultOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @private
 * @param {String} str
 * @returns {RegExp}
 */
var toRegExp = function toRegExp(str) {
    return new RegExp((0, _lodash.escapeRegExp)(str));
};

/**
 * @private
 * @param {Object} options
 * @returns {RegExp[]}
 */
var getLocaleInterpolate = function getLocaleInterpolate(options) {
    var localeInterpolate = options.localeInterpolate;

    if ((0, _lodash.isString)(options.localeInterpolate)) {
        localeInterpolate = [options.localeInterpolate];
    } else if ((0, _lodash.isRegExp)(options.localeInterpolate)) {
        localeInterpolate = [options.localeInterpolate];
    }

    if (Array.isArray(localeInterpolate)) {
        localeInterpolate = localeInterpolate.map(function (x) {
            return (0, _lodash.isRegExp)(x) ? x : toRegExp(x);
        });
    }

    return localeInterpolate;
};

/**
 * @param {*} loaderContext
 * @returns {Object}
 */

exports.default = function (loaderContext) {
    var options = (0, _loaderUtils.getOptions)(loaderContext) || {};

    options.localeInterpolate = getLocaleInterpolate(options);

    return (0, _lodash.defaults)(options, _defaultOptions2.default);
};
//# sourceMappingURL=getOptions.js.map