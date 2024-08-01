import { constructFormatter } from './constructFormatter';

import type { IFormatter } from './types';

const TestFormatter = jest
    .fn<IFormatter<Record<'a' | 'b', string>>, any>()
    .mockImplementation(() => ({
        format: jest
            .fn<string, [data: Record<'a' | 'b', string>]>()
            .mockImplementation(({ a, b }) => `a is "${a}", but b is "${b}"`),
    }));

describe('constructFormatter', () => {
    const formatter = constructFormatter(TestFormatter);

    it('should format all passed values', () => {
        const formatted = formatter({ a: '123', b: '456' });
        expect(formatted).toBe('a is "123", but b is "456"');
    });

    it('should return null if the data is null or undefined', () => {
        const formattedFirst = formatter(null);
        const formattedSecond = formatter(undefined);

        expect(formattedFirst).toBe('null');
        expect(formattedSecond).toBe('null');
    });

    it('should return the defaultValue if the data is null of undefined, but the second paramater is passed', () => {
        const formatted = formatter(null, 'defaultValue');

        expect(formatted).toBe('defaultValue');
    });
});
