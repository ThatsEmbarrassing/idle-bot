import { intlFormatDistance } from 'date-fns';

import { IFormatter } from '@idle-discord-bot/utils';

import type { IDateDistanceFormatterOptions } from './types';

export class DateDistanceFormatter implements IFormatter<IDateDistanceFormatterOptions> {
    format(data: IDateDistanceFormatterOptions) {
        const { baseDate, date, intlOptions: options } = data;

        return intlFormatDistance(date, baseDate, options);
    }
}
