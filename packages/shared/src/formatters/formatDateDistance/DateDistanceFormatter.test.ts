import { constructFormatter } from '@idle-discord-bot/utils';

import { DateDistanceFormatter } from './DateDistanceFormatter';

const nowTimestamp = 1722669246767;
const tomorrowTimestamp = 1722755984000;

const formatDateDistance = constructFormatter(DateDistanceFormatter);

describe('DateDistanceFormatter', () => {
    it('should format date distance', () => {
        expect(formatDateDistance({ baseDate: nowTimestamp, date: tomorrowTimestamp })).toBe(
            'завтра',
        );
        expect(formatDateDistance({ baseDate: tomorrowTimestamp, date: nowTimestamp })).toBe(
            'вчера',
        );
    });
});
