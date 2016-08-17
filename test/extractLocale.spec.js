import defaultOptions from '../src/defaultOptions';
import extractLocale from '../src/extractLocale';

describe('extractLocale', () => {
    it('should return `defaultLocale` if `locale` is absent', () => {
        expect('en_US').toEqual(extractLocale({
            resourcePath: './test/fixtures/foo.json'
        }, defaultOptions));
    });

    it('should extract `locale` from `basename(loaderContext.resourcePath)`', () => {
        expect('de_DE').toEqual(extractLocale({
            resourcePath: './test/fixtures/foo_de_DE.json'
        }, defaultOptions));

        expect('de_DE').toEqual(extractLocale({
            resourcePath: './test/fixtures/en_US/foo_de_DE.json'
        }, defaultOptions));

        expect('en').toEqual(extractLocale({
            resourcePath: './test/fixtures/foo_en.json'
        }, defaultOptions));

        expect('en').toEqual(extractLocale({
            resourcePath: './test/fixtures/de/foo_en.json'
        }, defaultOptions));
    });

    it('should extract `locale` from `dirname(loaderContext.resourcePath)`', () => {
        expect('de_DE').toEqual(extractLocale({
            resourcePath: './test/fixtures/de_DE/foo.json'
        }, defaultOptions));

        expect('de_DE').toEqual(extractLocale({
            resourcePath: './test/fixtures\\de_DE\\foo.json'
        }, defaultOptions));

        expect('en').toEqual(extractLocale({
            resourcePath: './test/fixtures/en/foo.json'
        }, defaultOptions));

        expect('en').toEqual(extractLocale({
            resourcePath: './test/fixtures\\en\\foo.json'
        }, defaultOptions));
    });
});
