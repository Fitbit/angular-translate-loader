import generateContent from '../src/generateContent';

describe('generateContent', () => {
    it('should generate `content`', () => {
        expect(generateContent()).toEqual(jasmine.any(String));
    });
});
