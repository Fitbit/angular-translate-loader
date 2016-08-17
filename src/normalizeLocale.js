import {
    trim
} from 'lodash';

/**
 * @private
 * @type {String}
 */
const SPECIAL_CHARS = '._-/\\';

/**
 * @param {String} locale
 * @returns {String}
 */
export default locale => trim(locale, SPECIAL_CHARS);
