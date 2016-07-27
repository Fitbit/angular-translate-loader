import {
    isEmpty
} from 'lodash';
import {
    sep
} from 'path';
import interpolateOptionsValue from './interpolateOptionsValue';

/**
 * @param {*} loaderContext
 * @param {*} content
 * @param {Object} options
 * @returns {String}
 */
export default (loaderContext, content, options) => {
    let value = interpolateOptionsValue('namespaces', loaderContext, content, options);

    if (!isEmpty(value)) {
        value = value.split(sep).join(options.sep) + options.sep;
    }

    return value;
};
