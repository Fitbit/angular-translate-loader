import {
    isObject,
    isString,
    mapKeys
} from 'lodash';
import loaderUtils from 'loader-utils';
import interpolateNamespaces from './interpolateNamespaces';

/**
 * @private
 * @type {RegExp}
 */
const MODULE_EXPORTS = /module\.exports\s?=\s?({[\s\S\n\t]+?});?/;

/**
 * @param {*} loaderContext
 * @param {String} content
 * @param {Object} options
 * @returns {Object}
 */
export default (loaderContext, content, options) => {
    let translations;

    if (Array.isArray(loaderContext.inputValue)) {
        translations = loaderContext.inputValue[0];
    } else if (isString(loaderContext.value)) {
        translations = JSON.parse(loaderContext.value);
    } else if (MODULE_EXPORTS.test(content)) {
        const match = content.match(MODULE_EXPORTS),
            value = match.length >= 1 ? match[1].toString() : '{}';

        translations = JSON.parse(loaderUtils.parseString(value));
    } else {
        translations = content;
    }

    if (!isObject(translations)) {
        translations = {};
    }

    const namespaces = interpolateNamespaces(loaderContext, translations, options);

    return mapKeys(translations, (value, key) => namespaces + key);
};
