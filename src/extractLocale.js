/**
 * @param {*} loaderContext
 * @param {Object} options
 * @returns {String}
 */
export default (loaderContext, options) => {
    const match = loaderContext.resourcePath.match(options.localeInterpolate);

    return match !== null ? match.toString() : options.defaultLocale;
};
