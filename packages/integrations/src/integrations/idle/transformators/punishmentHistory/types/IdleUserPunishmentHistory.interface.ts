import type { IdleUserPunishment } from '@integrations/idle/transformators/punishment';

export interface IdleUserPunishmentHistory {
    length: number;
    items: IdleUserPunishment[];
}
