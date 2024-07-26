import { IdleUserVIP } from './IdleUserVIP.interface';
import { IdleUserRank } from './IdleUserRank.interface';

/**
 * Modified information about player of Idle servers.
 */
export interface IdleUserProfile {
    /**
     * Modified information about player's activity rank.
     */
    rank: IdleUserRank;
    /**
     * Modified information about player's VIP status.
     */
    vip: IdleUserVIP;
}
