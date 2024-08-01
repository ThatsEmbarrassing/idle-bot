import { Either } from 'purify-ts/Either';

import { safeExtract } from './safeExtract';

describe('safeExtract', () => {
    it('should throw if the value is an error', () => {
        const either = Either.encase(() => {
            throw new Error();
        });

        expect(() => safeExtract(either)).toThrow();
    });

    it('should return value', () => {
        const either = Either.of(5);

        expect(safeExtract(either)).toBe(5);
    });
});
