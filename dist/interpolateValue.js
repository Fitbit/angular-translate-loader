'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _lodash = require('lodash');

var _path = require('path');

var _loaderUtils = require('loader-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @private
 * @type {Object<String,Function>}
 */
var INTERPOLATIONS = {
    /**
     * @private
     * @param {String} context
     * @param {String} resourcePath
     * @returns {String}
     */
    '[dir]': function dir(context, resourcePath) {
        return (0, _lodash.trim)((0, _path.dirname)((0, _path.resolve)(resourcePath).replace((0, _path.resolve)(context), '')), _path.sep);
    }
};

/**
 * @param {String} value
 * @param {*} loaderContext
 * @param {*} content
 * @param {Object} options
 * @returns {String}
 */

exports.default = function (value, loaderContext, content, options) {
    var context = options.context || loaderContext.options.context || './';

    value = (0, _loaderUtils.interpolateName)(loaderContext, value, {
        context: context,
        content: (0, _lodash.isObject)(content) ? (0, _stringify2.default)(content) : content,
        regExp: options.regExp
    });

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = (0, _getIterator3.default)((0, _entries2.default)(INTERPOLATIONS)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _ref = _step.value;

            var _ref2 = (0, _slicedToArray3.default)(_ref, 2);

            var name = _ref2[0];
            var interpolation = _ref2[1];

            var regexp = new RegExp((0, _lodash.escapeRegExp)(name), 'g');

            value = value.replace(regexp, interpolation(context, loaderContext.resourcePath));
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
//# sourceMappingURL=interpolateValue.js.map