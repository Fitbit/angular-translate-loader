import {
    trim
} from 'lodash';
import {
    sep
} from 'path';

/**
 * @private
 * @type {String}
 */
const SPECIAL_CHARS = `._-${sep}`;

/**
 * @param {String} locale
 * @returns {String}
 */
export default locale => trim(locale, SPECIAL_CHARS);
