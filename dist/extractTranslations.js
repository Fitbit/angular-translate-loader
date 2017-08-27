'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require('lodash');

var _loaderUtils = require('loader-utils');

var _package = require('../package.json');

var _interpolateNamespaces = require('./interpolateNamespaces');

var _interpolateNamespaces2 = _interopRequireDefault(_interpolateNamespaces);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @private
 * @type {RegExp}
 */
var MODULE_EXPORTS = /module\.exports\s?=\s?({[\s\S\n\t]+?});?/;

/**
 * @private
 * @param {String} value
 * @return {Object}
 */
function parseJson(value) {
    return JSON.parse((0, _loaderUtils.parseString)(value));
}

/**
 * @param {String} value
 * @return {Boolean}
 */
function isModule(value) {
    return (0, _lodash.isString)(value) && MODULE_EXPORTS.test(value);
}

/**
 * @param {String} value
 * @return {Object}
 */
function extractFromModule(value) {
    var matches = value.match(MODULE_EXPORTS),
        match = matches.length >= 1 ? matches[1].toString() : '{}';

    return parseJson(match);
}

/**
 * @param {String} value
 * @return {Object}
 */
function convertValue(value) {
    var result = void 0;

    if (isModule(value)) {
        result = extractFromModule(value);
    } else if ((0, _lodash.isString)(value)) {
        result = parseJson(value);
    } else if ((0, _lodash.isObject)(value)) {
        result = value;
    }

    if (!(0, _lodash.isObject)(result)) {
        throw new Error('"' + _package.name + '" loader only accepts \'Object\' value.');
    }

    return result;
}

/**
 * @param {*} loaderContext
 * @param {String} content
 * @returns {*}
 */
function findValue(loaderContext, content) {
    var value = void 0;

    if ((0, _lodash.isString)(content)) {
        value = content;
    } else if (content instanceof Buffer) {
        value = content.toString();
    } else if (Array.isArray(loaderContext.inputValue)) {
        value = loaderContext.inputValue[0];
    } else if ((0, _lodash.isString)(loaderContext.value)) {
        value = loaderContext.value;
    } else {
        value = content;
    }

    return value;
}

/**
 * @param {*} loaderContext
 * @param {*} content
 * @param {Object} options
 * @returns {Object}
 */

exports.default = function (loaderContext, content, options) {
    var rawValue = findValue(loaderContext, content);

    var value = void 0;

    try {
        value = convertValue(rawValue);
    } catch (err) {
        loaderContext.emitError(err);
    }

    var namespaces = (0, _interpolateNamespaces2.default)(loaderContext, value, options);

    return (0, _lodash.mapKeys)(value, function (value, key) {
        return namespaces + key;
    });
};
//# sourceMappingURL=extractTranslations.js.map