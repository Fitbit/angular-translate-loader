import {
    isEmpty
} from 'lodash';
import interpolateValue from './interpolateValue';

/**
 * @private
 * @param {String} key
 * @param {*} loaderContext
 * @param {*} content
 * @param {Object} options
 * @returns {String}
 */
export default (key, loaderContext, content, options) => {
    let value = options[key];

    if (Array.isArray(value)) {
        value = value.join(options.sep);
    }

    if (!isEmpty(value)) {
        value = interpolateValue(value, loaderContext, content, options);
    }

    return value;
};
