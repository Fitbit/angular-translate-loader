import normalizeLocale from '../src/normalizeLocale';

describe('normalizeLocale', () => {
    it('should normalize `locale` from `._-en_US-_.`', () => {
        expect('en_US').toEqual(normalizeLocale('._-en_US-_.'));
    });
});
