/**
 * Information about steam user's bans
 */
export interface ISteamPlayerBans {
    /**
     * 64bit SteamID of the user
     */
    SteamId: string;
    /**
     * Represents whether user has banned in a community game or not
     */
    CommunityBanned: boolean;
    /**
     * Represents whether user has VAC banned in a VAC-protected game.
     */
    VACBanned: boolean;
    /**
     * Number of VAC bans
     */
    NumberOfVACBans: number;
    /**
     * Days since last ban
     */
    DaysSinceLastBan: number;
    /**
     * Number of game bans
     */
    NumberOfGameBans: number;
    /**
     * Trade ban status
     */
    EconomyBan: string;
}
