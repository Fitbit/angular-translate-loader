import {
    basename,
    dirname,
    sep
} from 'path';
import normalizeLocale from './normalizeLocale';

/**
 * @private
 * @param {String} resourcePath
 * @param {RegExp[]} localeInterpolate
 * @returns {String}
 */
const extractLocaleOrNull = (resourcePath, localeInterpolate) => {
    let value = null;

    for (const re of localeInterpolate) {
        const result = resourcePath.match(re);

        if (result !== null) {
            value = result.toString();
            break;
        }
    }

    return value;
};

/**
 * @private
 * @type {Function[]}
 */
// eslint-disable-line valid-jsdoc
const EXTRACTORS = [
    /**
     * @param {String} resourcePath
     * @param {RegExp[]} localeInterpolate
     * @returns {String}
     */
    (resourcePath, localeInterpolate) => extractLocaleOrNull(basename(resourcePath), localeInterpolate),

    /**
     * @param {String} resourcePath
     * @param {RegExp[]} localeInterpolate
     * @returns {String}
     */
    (resourcePath, localeInterpolate) => extractLocaleOrNull(dirname(resourcePath) + sep, localeInterpolate)
];

/**
 * @param {*} loaderContext
 * @param {Object} options
 * @returns {String}
 */
export default (loaderContext, options) => {
    let locale = options.defaultLocale;

    for (const extractor of EXTRACTORS) {
        const extractedLocale = extractor(loaderContext.resourcePath, options.localeInterpolate);

        if (extractedLocale !== null) {
            locale = extractedLocale;
            break;
        }
    }

    return normalizeLocale(locale);
};
