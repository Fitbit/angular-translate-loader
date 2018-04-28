import {
    mapKeys
} from 'lodash';
import defaultOptions from '../src/defaultOptions';
import extractTranslations from '../src/extractTranslations';

const TRANSLATIONS = {
    foo: 'foo',
    bar: 'bar1'
};

describe('extractTranslations', () => {
    it('should extract `translations` from `loaderContext.inputValue[0]`', () => {
        expect(TRANSLATIONS).toEqual(extractTranslations({
            inputValue: [TRANSLATIONS]
        }, null, defaultOptions));
    });

    it('should extract `translations` from `loaderContext.value`', () => {
        expect(TRANSLATIONS).toEqual(extractTranslations({
            value: JSON.stringify(TRANSLATIONS)
        }, null, defaultOptions));
    });

    it('should extract `translations` from `content`', () => {
        expect(TRANSLATIONS).toEqual(extractTranslations({}, `module.exports = ${JSON.stringify(TRANSLATIONS)};`, defaultOptions));
        expect(TRANSLATIONS).toEqual(extractTranslations({}, Buffer.from(JSON.stringify(TRANSLATIONS)), defaultOptions));
    });

    it('should extract `translations` using `namespaces`', () => {
        const namespaces = 'app',
            sep = defaultOptions.sep,
            translations = mapKeys(TRANSLATIONS, (value, key) => `${namespaces}${sep}${key}`);

        expect(translations).toEqual(extractTranslations({
            value: JSON.stringify(TRANSLATIONS),
            resourcePath: './test/fixtures/foo.json',
            context: './test/fixtures',
            options: {}
        }, null, Object.assign({}, defaultOptions, {
            namespaces
        })));
    });

    it('should extract `translations` using `namespaces` and `sep`', () => {
        const namespaces = 'app',
            sep = '.',
            translations = mapKeys(TRANSLATIONS, (value, key) => `${namespaces}${sep}${key}`);

        expect(translations).toEqual(extractTranslations({
            value: JSON.stringify(TRANSLATIONS),
            resourcePath: './test/fixtures/foo.json',
            context: './test/fixtures',
            options: {}
        }, null, Object.assign({}, defaultOptions, {
            namespaces,
            sep
        })));
    });

    it('should emit error in case of invalid `translations`', () => {
        const loaderContext = {
            emitError() {}
        };

        spyOn(loaderContext, 'emitError');

        expect({}).toEqual(extractTranslations(loaderContext, false, defaultOptions));
        expect({}).toEqual(extractTranslations(loaderContext, 1, defaultOptions));
        expect({}).toEqual(extractTranslations(loaderContext, '', defaultOptions));

        expect(loaderContext.emitError).toHaveBeenCalledTimes(3);
    });
});
