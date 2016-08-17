import {
    defaults,
    camelCase,
    isString,
    isRegExp,
    escapeRegExp
} from 'lodash';
import loaderUtils from 'loader-utils';
import DEFAULT_OPTIONS from './defaultOptions';

/**
 * @private
 * @type {String}
 */
const CONFIG_KEY = camelCase('angular-translate');

/**
 * @private
 * @param {String} str
 * @returns {RegExp}
 */
const toRegExp = str => new RegExp(escapeRegExp(str));

/**
 * @private
 * @param {Object} options
 * @returns {RegExp[]}
 */
const getLocaleInterpolate = options => {
    let localeInterpolate = options.localeInterpolate;

    if (isString(options.localeInterpolate)) {
        localeInterpolate = [
            options.localeInterpolate
        ];
    } else if (isRegExp(options.localeInterpolate)) {
        localeInterpolate = [
            options.localeInterpolate
        ];
    }

    if (Array.isArray(localeInterpolate)) {
        localeInterpolate = localeInterpolate.map(x => isRegExp(x) ? x : toRegExp(x));
    }

    return localeInterpolate;
};

/**
 * @param {*} loaderContext
 * @returns {Object}
 */
export default loaderContext => {
    const options = loaderUtils.getLoaderConfig(loaderContext, CONFIG_KEY);

    options.localeInterpolate = getLocaleInterpolate(options);

    return defaults(options, DEFAULT_OPTIONS);
};
