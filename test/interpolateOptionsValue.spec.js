import {
    sep,
    join
} from 'path';
import interpolateOptionsValue from '../src/interpolateOptionsValue';

describe('interpolateOptionsValue', () => {
    it('should interpolate `options` using `{foo: "[dir]"}`', () => {
        expect(join('test', 'fixtures')).toEqual(interpolateOptionsValue('foo', {
            resourcePath: './test/fixtures/foo.json',
            context: './test/fixtures',
            options: {}
        }, '', {
            foo: '[dir]',
            sep
        }));
    });

    it('should interpolate `options` using `{foo: ["[dir]", "app"]}`', () => {
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
