import type { IdleUserPunishment } from '../../punishment/types';

export interface IdleUserPunishmentHistory {
    length: number;
    items: IdleUserPunishment[];
}
