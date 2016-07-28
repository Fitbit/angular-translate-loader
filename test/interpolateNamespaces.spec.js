import interpolateNamespaces from '../src/interpolateNamespaces';

describe('interpolateNamespaces', () => {
    it('should interpolate `namespaces` value', () => {
        expect('app.').toEqual(interpolateNamespaces({
            resourcePath: './test/fixtures/foo.json',
            context: './test/fixtures',
            options: {}
        }, '', {
            namespaces: 'app',
            sep: '.'
        }));
    });
});
