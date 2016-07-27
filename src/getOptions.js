import {
    defaultsDeep,
    camelCase,
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
 * @param {*} loaderContext
 * @returns {Object}
 */
export default loaderContext => {
    const options = loaderUtils.getLoaderConfig(loaderContext, CONFIG_KEY);

    defaultsDeep(options, DEFAULT_OPTIONS);

    if (!isRegExp(options.localeInterpolate)) {
        options.localeInterpolate = new RegExp(escapeRegExp(options.localeInterpolate));
    }

    return options;
};
