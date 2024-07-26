import type { IntlFormatDistanceOptions } from 'date-fns';

export interface IDateDistanceFormatterOptions {
    date: string | number | Date;
    baseDate: string | number | Date;
    intlOptions?: IntlFormatDistanceOptions;
}
