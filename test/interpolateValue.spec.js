import {
    sep,
    join
} from 'path';
import defaultOptions from '../src/defaultOptions';
import interpolateValue from '../src/interpolateValue';

describe('interpolateValue', () => {
    it('should interpolate `[dir]` value', () => {
        const options = Object.assign({}, defaultOptions, {
            sep
        });

        expect(join('test', 'fixtures')).toEqual(interpolateValue('[dir]', {
            resourcePath: './test/fixtures/foo.json',
            context: './test/fixtures',
            options: {}
        }, '', options));
    });
});
