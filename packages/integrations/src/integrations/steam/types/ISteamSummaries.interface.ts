/**
 * Information about steam user from API.
 *
 */
export interface ISteamSummaries {
    /**
     * 64bit SteamID of the user
     */
    steamid: string;
    /**
     * This represents whether the profile is visible or not, and if it is visible, why you are allowed to see it.
     */
    communityvisibilitystate: number;
    /**
     * If set, indicates the user has a community profile configured (will be set to '1')
     */
    profilestate: number;
    /**
     * The user's current status. 0 - Offline, 1 - Online, 2 - Busy, 3 - Away, 4 - Snooze, 5 - looking to trade, 6 - looking to play. If the player's profile is private, this will always be "0", except is the user has set their status to looking to trade or looking to play, because a bug makes those status appear even if the profile is private.
     */
    personastate: number;
    /**
     * The player's persona name (display name)
     */
    personaname: string;
    /**
     * The last time the user was online, in unix time.
     */
    lastlogoff: number;
    /**
     * The full URL of the player's Steam Community profile.
     */
    profileurl: string;
    /**
     * The full URL of the player's 32x32px avatar. If the user hasn't configured an avatar, this will be the default ? avatar.
     */
    avatar: string;
    /**
     * The full URL of the player's 64x64px avatar. If the user hasn't configured an avatar, this will be the default ? avatar.
     */
    avatarmedium: string;
    /**
     * The full URL of the player's 184x184px avatar. If the user hasn't configured an avatar, this will be the default ? avatar.
     */
    avatarfull: string;
}
