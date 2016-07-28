import {
    sep,
    join
} from 'path';
import interpolateOptionsValue from '../src/interpolateOptionsValue';

describe('interpolateOptionsValue', () => {
    it('should interpolate `options` value', () => {
        expect(join('test', 'fixtures')).toEqual(interpolateOptionsValue('foo', {
            resourcePath: './test/fixtures/foo.json',
            context: './test/fixtures',
            options: {}
        }, '', {
            foo: '[dir]',
            sep
        }));

        expect(join('test', 'fixtures', 'app')).toEqual(interpolateOptionsValue('foo', {
            resourcePath: './test/fixtures/foo.json',
            context: './test/fixtures',
            options: {}
        }, '', {
            foo: [
                '[dir]',
                'app'
            ],
            sep
        }));
    });
});
