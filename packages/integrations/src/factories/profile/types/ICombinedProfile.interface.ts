import type {
    IdleUserProfile,
    IdleUserPunishment,
    IdleUserPunishmentHistory,
    IdleUserRank,
    IdleUserVIP,
} from '@integrations/idle';

export interface ICombinedPunishment {
    current: IdleUserPunishment | null;
    history: IdleUserPunishmentHistory;
}

export interface ICombinedProfile extends IdleUserProfile {
    nickname: string;
    steamid: string;
    profileurl: string;
    avatar: string;
    vac: boolean;
    rank: IdleUserRank;
    vip: IdleUserVIP;
    punishments: Record<'mutes' | 'bans', ICombinedPunishment>;
}
