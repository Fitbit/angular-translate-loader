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
        /[/\\][a-z]{2}_[A-Z]{2}[/\\]/, // './test/fixtures/en_US/foo.json'
        /[/\\][a-z]{2}[/\\]/ // './test/fixtures/en/foo.json'
    ],
    defaultLocale: 'en_US'
};

export default DEFAULT_OPTIONS;
