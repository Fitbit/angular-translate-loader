import interpolateOptionsValue from './interpolateOptionsValue';

/**
 * @private
 * @param {*} loaderContext
 * @param {*} content
 * @param {Object} options
 * @returns {String}
 */
export default (loaderContext, content, options) => {
    return interpolateOptionsValue('module', loaderContext, content, options);
};
