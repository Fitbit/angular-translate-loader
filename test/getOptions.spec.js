import defaultOptions from '../src/defaultOptions';
import getOptions from '../src/getOptions';

describe('getOptions', () => {
    it('should get `options`', () => {
        expect(defaultOptions).toEqual(getOptions({
            angularTranslate: {},
            query: '?config=angularTranslate',
            options: {}
        }));

        expect(Object.assign({}, defaultOptions, {
            localeInterpolate: /en_US/
        })).toEqual(getOptions({
            query: '?config=angularTranslate',
            options: {
                angularTranslate: {
                    localeInterpolate: 'en_US'
                }
            }
        }));
    });
});
