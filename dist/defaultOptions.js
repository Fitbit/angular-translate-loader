'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @private
 */
var DEFAULT_OPTIONS = {
    module: 'translations',
    namespaces: '',
    sep: '/',
    localeInterpolate: [/_[a-z]{2}_[A-Z]{2}\./, // './test/fixtures/foo_en_US.json'
    /_[a-z]{2}\./, // './test/fixtures/foo_en.json'
    /[/\\][a-z]{2}_[A-Z]{2}[/\\]/, // './test/fixtures/en_US/foo.json'
    /[/\\][a-z]{2}[/\\]/ // './test/fixtures/en/foo.json'
    ],
    defaultLocale: 'en_US',
    requireAngular: false
};

exports.default = DEFAULT_OPTIONS;
//# sourceMappingURL=defaultOptions.js.map