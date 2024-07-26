import { IFormatter } from '@idle-discord-bot/utils';

import { formatDateTime, formatDateDistance } from '@idle-discord-bot/shared';

import type { IdleUserVIP } from '@idle-discord-bot/integrations';

export class VipFormatter implements IFormatter<IdleUserVIP> {
    private createdFormattedDate(data: IdleUserVIP) {
        return formatDateTime(data.created);
    }

    private endsFormattedDate(data: IdleUserVIP) {
        return formatDateTime(data.ends);
    }

    private deadlineFormattedDate(data: IdleUserVIP) {
        return formatDateDistance({
            date: data.ends,
            baseDate: Date.now(),
            intlOptions: {
                locale: 'ru',
                unit: 'day',
            },
        });
    }

    format(data: IdleUserVIP) {
        return data.enabled
            ? `Куплена ${this.createdFormattedDate(data)}. Заканчивается ${this.endsFormattedDate(data)}*(${this.deadlineFormattedDate(data)})*.`
            : 'Отсутствует.';
    }
}
