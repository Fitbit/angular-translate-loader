import {
    sep
} from 'path';
import {
    escapeRegExp
} from 'lodash';

/**
 * @private
 * @type {String}
 */
const SEP = escapeRegExp(sep);

/**
 * @private
 */
const DEFAULT_OPTIONS = {
    module: 'translations',
    namespaces: '',
    sep: '/',
    localeInterpolate: [
        /_[a-z]{2}_[A-Z]{2}\./, // './test/fixtures/foo_en_US.json'
        /_[a-z]{2}\./, // './test/fixtures/foo_en.json'
        new RegExp(`${SEP}[a-z]{2}_[A-Z]{2}${SEP}`), // './test/fixtures/en_US/foo.json'
        new RegExp(`${SEP}[a-z]{2}${SEP}`) // './test/fixtures/en/foo.json'
    ],
    defaultLocale: 'en_US'
};

export default DEFAULT_OPTIONS;
