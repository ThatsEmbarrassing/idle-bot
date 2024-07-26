import { IRankResponse } from './IRankResponse.interface';
import { IVipResponse } from './IVipResponse.interface';

/**
 * Information about player of Idle servers
 */
export interface ISuccessfulGetProfileResponse {
    /**
     * Information about player's VIP status
     */
    Vipka: IVipResponse;
    /**
     * Information about player's activity rank
     */
    Rank: IRankResponse;
    /**
     * The table of ranks (including specials)
     */
    Ranks: string[];
    /**
     * The table of rank points (including points for special ranks)
     */
    Points: number[];
}
