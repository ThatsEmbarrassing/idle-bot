import type { IBasePunishment as CurrentMuteResponse } from '@integrations/idle/types';
import type { PunishmentName, PunishmentLongRemoveType } from '@integrations/idle/enums';

/**
 * Modified information about player's mute
 *
 */
export type IdleUserPunishment = Pick<
    CurrentMuteResponse,
    'name' | 'created' | 'ends' | 'reason'
> & {
    /**
     * Punishment's method
     */
    method: string;
    /**
     * Punishment's type
     */
    type: PunishmentName;
    /**
     * Nickname of the admin who removed player's punishment (null if punishment isn't removed)
     */
    removedBy: string | null;
    /**
     * Timestamp when the punishment was removed (null if punishment isn't removed)
     */
    removedOn: number | null;
    /**
     * Removing punishment's type (null if punishment isn't removed)
     */
    removeType: PunishmentLongRemoveType | null;
    /**
     * Removing's punishment reason (null if punishment isn't removed)
     */
    removeReason: string | null;
};
