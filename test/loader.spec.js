import {
    join
} from 'path';
import {
    readFileSync
} from 'fs';
import {
    mapKeys
} from 'lodash';
import webpack from 'webpack';
import MemoryFileSystem from 'memory-fs';
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
    },
    LOADER = require.resolve('../src/index.js');

const toTranslations = (translations, options) => mapKeys(translations, (value, key) => `${options.namespaces}${options.sep}${key}`);

describe('loader', () => {
    it('should load `translations` for `en_US` locale', done => {
        makeRequest('./test/fixtures/foo.json', content => {
            expect(generateContent(QUERY.module, 'en_US', toTranslations({
                foo1: 'one',
                foo2: 'two'
            }, QUERY))).toEqual(content);

            done();
        }, OPTIONS, QUERY);
    });

    it('should return `translations` for `de_DE` locale', done => {
        makeRequest('./test/fixtures/foo_de_DE.json', content => {
            expect(generateContent(QUERY.module, 'de_DE', toTranslations({
                foo1: 'ein',
                foo2: 'zwei'
            }, QUERY))).toEqual(content);

            done();
        }, OPTIONS, QUERY);
    });

    it('should return `translations` for `en` locale', done => {
        makeRequest('./test/fixtures/foo_en.json', content => {
            expect(generateContent(QUERY.module, 'en', toTranslations({
                foo1: 'one',
                foo2: 'two'
            }, QUERY))).toEqual(content);

            done();
        }, OPTIONS, QUERY);
    });

    it('should compile successfully by `webpack`', done => {
        const OUTPUT_PATH = join(__dirname, 'out'),
            OUTPUT_FILENAME = 'bundle.js',
            ENCODING = 'utf-8';

        const compiler = webpack({
            mode: 'development',
            context: __dirname,
            output: {
                filename: OUTPUT_FILENAME,
                path: OUTPUT_PATH,
                pathinfo: false
            },
            entry: [
                'foo.json',
                'foo_de_DE.json'
            ],
            resolve: {
                modules: [
                    'node_modules',
                    'fixtures'
                ]
            },
            externals: {
                angular: true
            },
            module: {
                rules: [{
                    type: 'javascript/auto',
                    test: /\.json$/,
                    enforce: 'pre',
                    loader: LOADER,
                    options: defaultOptions
                }]
            }
        });

        compiler.outputFileSystem = new MemoryFileSystem();

        compiler.run((err, stats) => {
            expect(err).toBe(null);

            const actual = compiler.outputFileSystem.readFileSync(join(OUTPUT_PATH, OUTPUT_FILENAME), ENCODING);
            const expected = readFileSync(join(__dirname, 'fixtures', OUTPUT_FILENAME), ENCODING);

            expect(stats).not.toBe(null);
            expect(stats.hasWarnings()).toBe(false);
            expect(stats.hasErrors()).toBe(false);
            expect(actual).toEqual(expected);

            done();
        });
    });
});
