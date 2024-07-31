import type { PunishmentCode, PunishmentShortRemoveType } from '@integrations/idle/enums';

/**
 * Information about player's current punishment
 *
 * @internal
 */
export interface IBasePunishment {
    /**
     * Player's name at the moment of punishing
     */
    name: string;
    /**
     * Player's steamID
     */
    authid: string;
    /**
     * Timestamp when the player was punished
     */
    created: number;
    /**
     * Timestamp when the punishment ends (0 if it's permanent)
     */
    ends: number;
    /**
     * Code type of punishment
     */
    type: PunishmentCode;
    /**
     * Punishment's reason
     */
    reason: string;
    /**
     * Server ID (0 if the player was punished via site)
     */
    sid: number;
    /**
     * Code of admin who removed player's punishment (null if the punishment isn't removed)
     */
    RemovedBy: number | null;
    /**
     * Type of removing the mute (null if the punishment isn't removed)
     *
     * E - Expired
     * U - Removed
     */
    RemoveType: PunishmentShortRemoveType | null;
    /**
     * Timestamp when the punishment was removed (null if the punishment isn't removed)
     */
    RemovedOn: number | null;
    /**
     * Removing punishment's reason (null if the punishment isn't removed)
     */
    ureason: string | null;
}
