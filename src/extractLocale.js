import normalizeLocale from './normalizeLocale';

/**
 * @param {*} loaderContext
 * @param {Object} options
 * @returns {String}
 */
export default (loaderContext, options) => {
    const match = loaderContext.resourcePath.match(options.localeInterpolate),
        locale = match !== null ? match.toString() : options.defaultLocale;

    return normalizeLocale(locale);
};
