import interpolateOptionsValue from '../src/interpolateOptionsValue';

describe('interpolateOptionsValue', () => {
    it('should interpolate `options` value', () => {
        expect('test/fixtures').toEqual(interpolateOptionsValue('foo', {
            resourcePath: './test/fixtures/foo.json',
            context: './test/fixtures',
            options: {}
        }, '', {
            foo: '[dir]'
        }));

        expect('test/fixtures/app').toEqual(interpolateOptionsValue('foo', {
            resourcePath: './test/fixtures/foo.json',
            context: './test/fixtures',
            options: {}
        }, '', {
            foo: [
                '[dir]',
                'app'
            ],
            sep: '/'
        }));
    });
});
