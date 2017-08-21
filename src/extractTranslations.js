import {
    isObject,
    isString,
    mapKeys
} from 'lodash';
import {
    parseString
} from 'loader-utils';
import {
    name
} from '../package.json';
import interpolateNamespaces from './interpolateNamespaces';

/**
 * @private
 * @type {RegExp}
 */
const MODULE_EXPORTS = /module\.exports\s?=\s?({[\s\S\n\t]+?});?/;

/**
 * @private
 * @param {String} value
 * @return {Object}
 */
function parseJson(value) {
    return JSON.parse(parseString(value));
}

/**
 * @param {String} value
 * @return {Boolean}
 */
function isModule(value) {
    return isString(value) && MODULE_EXPORTS.test(value);
}

/**
 * @param {String} value
 * @return {Object}
 */
function extractFromModule(value) {
    const matches = value.match(MODULE_EXPORTS),
        match = matches.length >= 1 ? matches[1].toString() : '{}';

    return parseJson(match);
}

/**
 * @param {String} value
 * @return {Object}
 */
function convertValue(value) {
    let result;

    if (isModule(value)) {
        result = extractFromModule(value);
    } else if (isString(value)) {
        result = parseJson(value);
    } else if (isObject(value)) {
        result = value;
    }

    if (!isObject(result)) {
        throw new Error(`"${name}" loader only accepts 'Object' value.`);
    }

    return result;
}

/**
 * @param {*} loaderContext
 * @param {String} content
 * @returns {*}
 */
function findValue(loaderContext, content) {
    let value;

    if (isString(content)) {
        value = content;
    } else if (content instanceof Buffer) {
        value = content.toString();
    } else if (Array.isArray(loaderContext.inputValue)) {
        value = loaderContext.inputValue[0];
    } else if (isString(loaderContext.value)) {
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
export default (loaderContext, content, options) => {
    const rawValue = findValue(loaderContext, content);

    let value;

    try {
        value = convertValue(rawValue);
    } catch(err) {
        loaderContext.emitError(err);
    }

    const namespaces = interpolateNamespaces(loaderContext, value, options);

    return mapKeys(value, (value, key) => namespaces + key);
};
