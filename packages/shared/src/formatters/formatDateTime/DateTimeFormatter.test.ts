import { constructFormatter } from '@idle-discord-bot/utils';

import { DateTimeFormatter } from './DateTimeFormatter';

const formatDateTime = constructFormatter(DateTimeFormatter);

const dateTimestamp = 1722669246767;

jest.spyOn(Date, 'now').mockReturnValue(dateTimestamp);

describe('DateTimeFormmater', () => {
    it('should format date timestamp', () => {
        expect(formatDateTime(Date.now())).toBe('03.08.24, 10:14:06');
    });

    it('should format date object', () => {
        expect(formatDateTime(new Date(dateTimestamp))).toBe('03.08.24, 10:14:06');
    });
});
