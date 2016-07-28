import {
    mapKeys
} from 'lodash';
import defaultOptions from '../src/defaultOptions';
import generateContent from '../src/generateContent';
import makeRequest from './helpers/makeRequest';

const QUERY = {
        module: 'translations',
        namespaces: 'app',
        sep: '.',
        config: 'angularTranslate'
    },
    OPTIONS = {
        angularTranslate: defaultOptions
    };

const loaderTranslations = (translations, options) => mapKeys(translations, (value, key) => `${options.namespaces}${options.sep}${key}`);

describe('loader', () => {
    it('should load `translations` for `en_US` locale', done => {
        makeRequest('./test/fixtures/foo.json', (translations, content) => {
            expect(translations).toEqual(loaderTranslations({
                foo1: 'one',
                foo2: 'two'
            }, QUERY));
            expect(generateContent(QUERY.module, 'en_US', translations)).toEqual(content);

            done();
        }, OPTIONS, QUERY);
    });

    it('should return `translations` for `de_DE` locale', done => {
        makeRequest('./test/fixtures/foo_de_DE.json', (translations, content) => {
            expect(translations).toEqual(loaderTranslations({
                foo1: 'ein',
                foo2: 'zwei'
            }, QUERY));

            expect(generateContent(QUERY.module, 'de_DE', translations)).toEqual(content);

            done();
        }, OPTIONS, QUERY);
    });

    it('should return `translations` for `en` locale', done => {
        makeRequest('./test/fixtures/foo_en.json', (translations, content) => {
            expect(translations).toEqual(loaderTranslations({
                foo1: 'one',
                foo2: 'two'
            }, QUERY));
            expect(generateContent(QUERY.module, 'en', translations)).toEqual(content);

            done();
        }, OPTIONS, QUERY);
    });
});
