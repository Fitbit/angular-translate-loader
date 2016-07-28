import defaultOptions from '../src/defaultOptions';
import extractLocale from '../src/extractLocale';

describe('extractLocale', () => {
    it('should extract `locale` from `loaderContext.resourcePath`', () => {
        expect('en_US').toEqual(extractLocale({
            resourcePath: './test/fixtures/foo.json'
        }, defaultOptions));

        expect('de_DE').toEqual(extractLocale({
            resourcePath: './test/fixtures/foo_de_DE.json'
        }, defaultOptions));

        expect('en').toEqual(extractLocale({
            resourcePath: './test/fixtures/foo_en.json'
        }, defaultOptions));
    });
});
