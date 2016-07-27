import {
    isObject,
    escapeRegExp,
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
 * @param {String} value
 * @param {*} loaderContext
 * @param {*} content
 * @param {Object} options
 * @returns {String}
 */
export default (value, loaderContext, content, options) => {
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
