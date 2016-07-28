import defaultOptions from '../src/defaultOptions';
import interpolateValue from '../src/interpolateValue';

describe('interpolateValue', () => {
    it('should interpolate `[dir]` value', () => {
        expect('test/fixtures').toEqual(interpolateValue('[dir]', {
            resourcePath: './test/fixtures/foo.json',
            context: './test/fixtures',
            options: {}
        }, '', defaultOptions));

        expect('test/fixtures').toEqual(interpolateValue('[dir]', {
            resourcePath: './test/fixtures/foo.json',
            context: './test/fixtures',
            options: {}
        }, {}, defaultOptions));
    });
});
