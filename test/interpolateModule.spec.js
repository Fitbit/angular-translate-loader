import {
    sep,
    join
} from 'path';
import interpolateModule from '../src/interpolateModule';

describe('interpolateModule', () => {
    it('should interpolate `module` value', () => {
        expect(join('test', 'fixtures')).toEqual(interpolateModule({
            resourcePath: './test/fixtures/foo.json',
            context: './test/fixtures',
            options: {}
        }, '', {
            module: '[dir]',
            sep
        }));

        expect(join('test', 'fixtures', 'app')).toEqual(interpolateModule({
            resourcePath: './test/fixtures/foo.json',
            context: './test/fixtures',
            options: {}
        }, '', {
            module: [
                '[dir]',
                'app'
            ],
            sep
        }));
    });
});
