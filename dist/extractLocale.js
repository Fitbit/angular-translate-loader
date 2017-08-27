'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _path = require('path');

var _normalizeLocale = require('./normalizeLocale');

var _normalizeLocale2 = _interopRequireDefault(_normalizeLocale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @private
 * @param {String} resourcePath
 * @param {RegExp[]} localeInterpolate
 * @returns {String}
 */
var extractLocaleOrNull = function extractLocaleOrNull(resourcePath, localeInterpolate) {
    var value = null;

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = (0, _getIterator3.default)(localeInterpolate), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var re = _step.value;

            var result = resourcePath.match(re);

            if (result !== null) {
                value = result.toString();
                break;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return value;
};

/**
 * @private
 * @type {Function[]}
 */
// eslint-disable-line valid-jsdoc
var EXTRACTORS = [
/**
 * @param {String} resourcePath
 * @param {RegExp[]} localeInterpolate
 * @returns {String}
 */
function (resourcePath, localeInterpolate) {
    return extractLocaleOrNull((0, _path.basename)(resourcePath), localeInterpolate);
},

/**
 * @param {String} resourcePath
 * @param {RegExp[]} localeInterpolate
 * @returns {String}
 */
function (resourcePath, localeInterpolate) {
    return extractLocaleOrNull((0, _path.dirname)(resourcePath) + _path.sep, localeInterpolate);
}];

/**
 * @param {*} loaderContext
 * @param {Object} options
 * @returns {String}
 */

exports.default = function (loaderContext, options) {
    var locale = options.defaultLocale;

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = (0, _getIterator3.default)(EXTRACTORS), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var extractor = _step2.value;

            var extractedLocale = extractor(loaderContext.resourcePath, options.localeInterpolate);

            if (extractedLocale !== null) {
                locale = extractedLocale;
                break;
            }
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    return (0, _normalizeLocale2.default)(locale);
};
//# sourceMappingURL=extractLocale.js.map