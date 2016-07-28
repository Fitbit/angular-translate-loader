import interpolateModule from '../src/interpolateModule';

describe('interpolateOptionsValue', () => {
    it('should interpolate `module` value', () => {
        expect('test/fixtures').toEqual(interpolateModule({
            resourcePath: './test/fixtures/foo.json',
            context: './test/fixtures',
            options: {}
        }, '', {
            module: '[dir]'
        }));

        expect('test/fixtures/app').toEqual(interpolateModule({
            resourcePath: './test/fixtures/foo.json',
            context: './test/fixtures',
            options: {}
        }, '', {
            module: [
                '[dir]',
                'app'
            ],
            sep: '/'
        }));
    });
});
