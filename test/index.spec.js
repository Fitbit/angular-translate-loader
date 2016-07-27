import generateCode from '../src/generateCode';
import makeRequest from './helpers/makeRequest';

describe('angular-translate-loader', () => {
    it('should return `translations` for `en_US` locale', done => {
        makeRequest('./test/fixtures/foo.json', (translations, content) => {
            expect(translations).toEqual({
                foo1: 'one',
                foo2: 'two'
            });
            expect(generateCode(undefined, undefined, translations)).toEqual(content);

            done();
        });
    });

    it('should return `translations` for `de_DE` locale', done => {
        makeRequest('./test/fixtures/foo_de_DE.json', (translations, content) => {
            expect(translations).toEqual({
                foo1: 'ein',
                foo2: 'zwei'
            });
            expect(generateCode(undefined, 'de_DE', translations)).toEqual(content);

            done();
        });
    });

    it('should return `translations` for `en` locale', done => {
        makeRequest('./test/fixtures/foo_en.json', (translations, content) => {
            expect(translations).toEqual({
                foo1: 'one',
                foo2: 'two'
            });
            expect(generateCode(undefined, 'en', translations)).toEqual(content);

            done();
        });
    });

    it('should set `module` to `app.translations`', done => {
        makeRequest('./test/fixtures/foo.json', (translations, content) => {
            expect(translations).toEqual({
                foo1: 'one',
                foo2: 'two'
            });
            expect(generateCode('app.translations', undefined, translations)).toEqual(content);

            done();
        }, {}, {
            module: 'app.translations'
        });
    });

    it('should set `module` to `app.translations`', done => {
        makeRequest('./test/fixtures/foo.json', (translations, content) => {
            expect(translations).toEqual({
                foo1: 'one',
                foo2: 'two'
            });
            expect(generateCode('app.translations', undefined, translations)).toEqual(content);

            done();
        }, {}, {
            module: ['app', 'translations'],
            sep: '.'
        });
    });

    it('should set `defaultLocale` to `de_DE` if absent', done => {
        makeRequest('./test/fixtures/foo.json', (translations, content) => {
            expect(translations).toEqual({
                foo1: 'one',
                foo2: 'two'
            });
            expect(generateCode(undefined, 'de_DE', translations)).toEqual(content);

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
            expect(generateCode(undefined, 'de_DE', translations)).toEqual(content);

            done();
        });
    });

    it('should use `localeInterpolate`', done => {
        makeRequest('./test/fixtures/foo_de_DE.json', (translations, content) => {
            expect(translations).toEqual({
                foo1: 'ein',
                foo2: 'zwei'
            });
            expect(generateCode(undefined, 'de_DE', translations)).toEqual(content);

            done();
        }, {}, {
            localeInterpolate: 'de_DE'
        });
    });

    it('should set `namespaces` to `app`', done => {
        makeRequest('./test/fixtures/foo.json', (translations, content) => {
            expect(translations).toEqual({
                'app/foo1': 'one',
                'app/foo2': 'two'
            });
            expect(generateCode(undefined, undefined, translations)).toEqual(content);

            done();
        }, {}, {
            namespaces: 'app'
        });
    });

    it('should set `namespaces` to `app.my`', done => {
        makeRequest('./test/fixtures/foo.json', (translations, content) => {
            expect(translations).toEqual({
                'app/my/foo1': 'one',
                'app/my/foo2': 'two'
            });
            expect(generateCode(undefined, undefined, translations)).toEqual(content);

            done();
        }, {}, {
            namespaces: ['app', 'my']
        });
    });

    it('should resolve `[dir]` `namespaces` as `test/fixtures`', done => {
        makeRequest('./test/fixtures/foo.json', (translations, content) => {
            expect(translations).toEqual({
                'test/fixtures/foo1': 'one',
                'test/fixtures/foo2': 'two'
            });
            expect(generateCode(undefined, undefined, translations)).toEqual(content);

            done();
        }, {}, {
            namespaces: '[dir]'
        });
    });

    it('should add `sep`to `namespaces`', done => {
        makeRequest('./test/fixtures/foo.json', (translations, content) => {
            expect(translations).toEqual({
                'app.foo1': 'one',
                'app.foo2': 'two'
            });
            expect(generateCode(undefined, undefined, translations)).toEqual(content);

            done();
        }, {}, {
            namespaces: 'app',
            sep: '.'
        });
    });

    it('should extract `content` from `inputValue`', done => {
        makeRequest('./test/fixtures/foo.json', (translations, content) => {
            expect(translations).toEqual({
                foo1: 1,
                foo2: 2
            });
            expect(generateCode(undefined, undefined, translations)).toEqual(content);

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
            expect(generateCode(undefined, undefined, translations)).toEqual(content);

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
            expect(generateCode(undefined, undefined, translations)).toEqual(content);

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
            expect(generateCode(undefined, undefined, translations)).toEqual(content);

            done();
        }, {
            content: `module.exports = ${JSON.stringify({
                foo1: 1,
                foo2: 2
            })};`
        });
    });
});
