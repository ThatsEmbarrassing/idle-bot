import { constructFormatter } from '@idle-discord-bot/utils';

import * as FormatDateDistance from '../formatDateDistance';
import * as FormatDateTime from '../formatDateTime';

import { VipFormatter } from './VipFormatter';

import type { IdleUserVIP } from '@idle-discord-bot/integrations';

const formatVip = constructFormatter(VipFormatter);

describe('VipFormatter', () => {
    const formatDateDistanceValue = '__format_date_distance_test__';
    const formatDateTimeValue = '__format_date_time_test__';

    const disabledVip: IdleUserVIP = {
        enabled: false,
        created: 0,
        ends: 0,
        length: 0,
    };

    const enabledVip: IdleUserVIP = {
        enabled: true,
        created: 0,
        ends: 0,
        length: 0,
    };

    jest.spyOn(FormatDateDistance, 'formatDateDistance').mockReturnValue(formatDateDistanceValue);
    jest.spyOn(FormatDateTime, 'formatDateTime').mockReturnValue(formatDateTimeValue);

    it('should format disabled VIP', () => {
        expect(formatVip(disabledVip)).toBe('Отсутствует.');
    });

    it('should format enabled VIP', () => {
        const expectedFormattedVIP = `Куплена ${formatDateTimeValue}. Заканчивается ${formatDateTimeValue}*(${formatDateDistanceValue})*.`;

        expect(formatVip(enabledVip)).toBe(expectedFormattedVIP);
    });
});
