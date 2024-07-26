import { punishmentTransformator } from '../punishment';

import type { IPunishmentList } from '../../types/common';

import type { IdleUserPunishmentHistory } from './types';

export function punishmentHistoryTransformator(value: IPunishmentList): IdleUserPunishmentHistory {
    return {
        length: value.Items.length,
        items: value.Items.map(punishmentTransformator),
    };
}
