import {
    readJson
} from 'fs-extra';
import loader from '../src';

describe('angular-translate-loader', () => {
    const makeRequest = (resourcePath, callback, options = {}, query = null) => {
        readJson(resourcePath, (err, json) => {
            const context = {
                resourcePath,
                options,
                cacheable: () => {},
                query: query ? `?${JSON.stringify(query)}` : ''
            };

            ['inputValue', 'value'].forEach(x => {
                context[x] = options[x];

                delete options[x];
            });

            if (err) {
                json = options.content;
            }

            delete options.content;

            const content = loader.call(context, json);

            callback(context.value, content);
        });
    };

    const makeContent = (module = 'translations', locale = 'en_US', translations) => {
        return `var angular = require("angular");
var translations = ${JSON.stringify(translations, null, '\t')};\n
angular.module("${module}", ["pascalprecht.translate"]).config(["$translateProvider", function($translateProvider) {
\t$translateProvider.translations("${locale}", translations);
}]);\n
module.exports = translations;`;
    };

    it('should return `translations` for `en_US` locale', done => {
        makeRequest('./test/fixtures/foo.json', (translations, content) => {
            expect(translations).toEqual({
                foo1: 'one',
                foo2: 'two'
            });
            expect(makeContent(undefined, undefined, translations)).toEqual(content);

            done();
        });
    });

    it('should return `translations` for `de_DE` locale', done => {
        makeRequest('./test/fixtures/foo_de_DE.json', (translations, content) => {
            expect(translations).toEqual({
                foo1: 'ein',
                foo2: 'zwei'
            });
            expect(makeContent(undefined, 'de_DE', translations)).toEqual(content);

            done();
        });
    });

    it('should set `module` to `app.translations`', done => {
        makeRequest('./test/fixtures/foo.json', (translations, content) => {
            expect(translations).toEqual({
                foo1: 'one',
                foo2: 'two'
            });
            expect(makeContent('app.translations', undefined, translations)).toEqual(content);

            done();
        }, {}, {
            module: 'app.translations'
        });
    });

    it('should set `defaultLocale` to `de_DE` if absent', done => {
        makeRequest('./test/fixtures/foo.json', (translations, content) => {
            expect(translations).toEqual({
                foo1: 'one',
                foo2: 'two'
            });
            expect(makeContent(undefined, 'de_DE', translations)).toEqual(content);

            done();
        }, {
            defaultLocale: 'en_US'
        }, {
            defaultLocale: 'de_DE'
        });
    });

    it('should not use `defaultLocale` if it exists', done => {
        makeRequest('./test/fixtures/foo_de_DE.json', (translations, content) => {
            expect(translations).toEqual({
                foo1: 'ein',
                foo2: 'zwei'
            });
            expect(makeContent(undefined, 'de_DE', translations)).toEqual(content);

            done();
        });
    });

    it('should use `localeInterpolate`', done => {
        makeRequest('./test/fixtures/foo_de_DE.json', (translations, content) => {
            expect(translations).toEqual({
                foo1: 'ein',
                foo2: 'zwei'
            });
            expect(makeContent(undefined, 'de_DE', translations)).toEqual(content);

            done();
        }, {}, {
            localeInterpolate: 'de_DE'
        });
    });

    it('should use `app.` prefix', done => {
        makeRequest('./test/fixtures/foo.json', (translations, content) => {
            expect(translations).toEqual({
                'app/foo1': 'one',
                'app/foo2': 'two'
            });
            expect(makeContent(undefined, undefined, translations)).toEqual(content);

            done();
        }, {}, {
            prefix: 'app'
        });
    });

    it('should use `[dir]` prefix', done => {
        makeRequest('./test/fixtures/foo.json', (translations, content) => {
            expect(translations).toEqual({
                'test/fixtures/foo1': 'one',
                'test/fixtures/foo2': 'two'
            });
            expect(makeContent(undefined, undefined, translations)).toEqual(content);

            done();
        }, {}, {
            prefix: '[dir]'
        });
    });

    it('should use `namespaces`', done => {
        makeRequest('./test/fixtures/foo.json', (translations, content) => {
            expect(translations).toEqual({
                'app.foo1': 'one',
                'app.foo2': 'two'
            });
            expect(makeContent(undefined, undefined, translations)).toEqual(content);

            done();
        }, {}, {
            prefix: 'app',
            namespaces: '.'
        });
    });

    it('should extract `content` from `inputValue`', done => {
        makeRequest('./test/fixtures/foo.json', (translations, content) => {
            expect(translations).toEqual({
                foo1: 1,
                foo2: 2
            });
            expect(makeContent(undefined, undefined, translations)).toEqual(content);

            done();
        }, {
            inputValue: [{
                foo1: 1,
                foo2: 2
            }]
        });
    });

    it('should extract `content` from `value`', done => {
        makeRequest('./test/fixtures/foo.json', (translations, content) => {
            expect(translations).toEqual({
                foo1: 1,
                foo2: 2
            });
            expect(makeContent(undefined, undefined, translations)).toEqual(content);

            done();
        }, {
            value: JSON.stringify({
                foo1: 1,
                foo2: 2
            })
        });
    });

    it('should extract `content` from empty `module.exports = {};', done => {
        makeRequest('./test/fixtures/fake.json', (translations, content) => {
            expect(translations).toEqual({});
            expect(makeContent(undefined, undefined, translations)).toEqual(content);

            done();
        }, {
            content: 'module.exports'
        });
    });

    it('should extract `content` from not empty `module.exports = {...};', done => {
        makeRequest('./test/fixtures/fake.json', (translations, content) => {
            expect(translations).toEqual({
                foo1: 1,
                foo2: 2
            });
            expect(makeContent(undefined, undefined, translations)).toEqual(content);

            done();
        }, {
            content: `module.exports = ${JSON.stringify({
                foo1: 1,
                foo2: 2
            })};`
        });
    });
});
