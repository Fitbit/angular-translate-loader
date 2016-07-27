import {
    defaultsDeep,
    camelCase,
    isRegExp,
    isString,
    isObject,
    isEmpty,
    escapeRegExp,
    mapKeys,
    trim
} from 'lodash';
import {
    sep,
    dirname,
    resolve
} from 'path';
import loaderUtils from 'loader-utils';

/**
 * @private
 * @type {Object}
 */
const DEFAULT_OPTIONS = {
    module: 'translations',
    namespaces: '',
    sep: '/',
    localeInterpolate: /[a-z]{2}_[A-Z]{2}/,
    defaultLocale: 'en_US'
};

/**
 * @private
 * @type {String}
 */
const CONFIG_KEY = camelCase('angular-translate');

/**
 * @private
 * @type {RegExp}
 */
const MODULE_EXPORTS = /module\.exports\s?=\s?({[\s\S\n\t]+?});?/;

/**
 * @private
 * @type {Object<String,Function>}
 */
const INTERPOLATIONS = {
    /**
     * @private
     * @param {String} context
     * @param {String} resourcePath
     * @returns {String}
     */
    '[dir]': (context, resourcePath) => trim(dirname(resolve(resourcePath).replace(resolve(context), '')), sep)
};

/**
 * @private
 * @param {*} loaderContext
 * @returns {Object}
 */
const getOptions = loaderContext => {
    const options = loaderUtils.getLoaderConfig(loaderContext, CONFIG_KEY);

    defaultsDeep(options, DEFAULT_OPTIONS);

    if (!isRegExp(options.localeInterpolate)) {
        options.localeInterpolate = new RegExp(escapeRegExp(options.localeInterpolate));
    }

    return options;
};

/**
 * @private
 * @param {*} loaderContext
 * @param {Object} options
 * @returns {String}
 */
const extractLocale = (loaderContext, options) => {
    const match = loaderContext.resourcePath.match(options.localeInterpolate);

    return match !== null ? match.toString() : options.defaultLocale;
};

/**
 * @private
 * @param {String} value
 * @param {*} loaderContext
 * @param {*} content
 * @param {Object} options
 * @returns {String}
 */
const interpolateValue = (value, loaderContext, content, options) => {
    const context = options.context || loaderContext.options.context || './';

    value = loaderUtils.interpolateName(loaderContext, value, {
        context: context,
        content: isObject(content) ? JSON.stringify(content) : content,
        regExp: options.regExp
    });

    for (const [name, interpolation] of Object.entries(INTERPOLATIONS)) {
        const regexp = new RegExp(escapeRegExp(name), 'g');

        value = value.replace(regexp, interpolation(context, loaderContext.resourcePath));
    }

    return value;
};

/**
 * @private
 * @param {String} key
 * @param {*} loaderContext
 * @param {*} content
 * @param {Object} options
 * @returns {String}
 */
const interpolateOptionsValue = (key, loaderContext, content, options) => {
    let value = options[key];

    if (Array.isArray(value)) {
        value = value.join(options.sep);
    }

    if (!isEmpty(value)) {
        value = interpolateValue(value, loaderContext, content, options);
    }

    return value;
};

/**
 * @private
 * @param {*} loaderContext
 * @param {*} content
 * @param {Object} options
 * @returns {String}
 */
const interpolateNamespaces = (loaderContext, content, options) => {
    let value = interpolateOptionsValue('namespaces', loaderContext, content, options);

    if (!isEmpty(value)) {
        value = value.split(sep).join(options.sep) + options.sep;
    }

    return value;
};

/**
 * @private
 * @param {*} loaderContext
 * @param {*} content
 * @param {Object} options
 * @returns {String}
 */
const interpolateModule = (loaderContext, content, options) => {
    return interpolateOptionsValue('module', loaderContext, content, options);
};

/**
 * @private
 * @param {*} loaderContext
 * @param {String} content
 * @param {Object} options
 * @returns {Object}
 */
const extractTranslations = (loaderContext, content, options) => {
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

/**
 * @param {*} content
 * @returns {String}
 */
export default function(content) {
    if (this.cacheable) {
        this.cacheable();
    }

    const options = getOptions(this),
        locale = extractLocale(this, options),
        translations = extractTranslations(this, content, options),
        module = interpolateModule(this, translations, options);

    this.value = translations;

    return `var angular = require("angular");
var translations = ${JSON.stringify(translations, null, '\t')};
var module;
try {
\tmodule = angular.module("${module}");
} catch(err) {
\tmodule = angular.module("${module}", ["pascalprecht.translate"]);
}
module.config(["$translateProvider", function($translateProvider) {
\t$translateProvider.translations("${locale}", translations);
}]);
module.exports = translations;`;
}
