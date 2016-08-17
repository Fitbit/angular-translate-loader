import defaultOptions from '../src/defaultOptions';
import getOptions from '../src/getOptions';

describe('getOptions', () => {
    const getExpectedOptions = options => Object.assign({}, defaultOptions, options);

    it('should get default `options`', () => {
        expect(getExpectedOptions(defaultOptions)).toEqual(getOptions({
            angularTranslate: {},
            query: '?config=angularTranslate',
            options: {}
        }));
    });

    it('should get options from `{localeInterpolate: "en_US"}`', () => {
        expect(getExpectedOptions({
            localeInterpolate: [
                /en_US/
            ]
        })).toEqual(getOptions({
            query: '?config=angularTranslate',
            options: {
                angularTranslate: {
                    localeInterpolate: 'en_US'
                }
            }
        }));
    });

    it('should get options from `{localeInterpolate: /en_US/}`', () => {
        expect(getExpectedOptions({
            localeInterpolate: [
                /en_US/
            ]
        })).toEqual(getOptions({
            query: '?config=angularTranslate',
            options: {
                angularTranslate: {
                    localeInterpolate: /en_US/
                }
            }
        }));
    });

    it('should get options from `{localeInterpolate: ["en_US", "de_DE"]}`', () => {
        expect(getExpectedOptions({
            localeInterpolate: [
                /en_US/,
                /de_DE/
            ]
        })).toEqual(getOptions({
            query: '?config=angularTranslate',
            options: {
                angularTranslate: {
                    localeInterpolate: [
                        'en_US',
                        'de_DE'
                    ]
                }
            }
        }));
    });

    it('should get options from `{localeInterpolate: [/en_US/, /de_DE/]}', () => {
        expect(getExpectedOptions({
            localeInterpolate: [
                /en_US/,
                /de_DE/
            ]
        })).toEqual(getOptions({
            query: '?config=angularTranslate',
            options: {
                angularTranslate: {
                    localeInterpolate: [
                        /en_US/,
                        /de_DE/
                    ]
                }
            }
        }));
    });
});
