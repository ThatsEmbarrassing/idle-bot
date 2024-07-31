import type { IVipResponse } from '@integrations/idle/types';

/**
 * Modified information about player's VIP status. Same as {@link IVipResponse | IVipResponse}
 */
export interface IdleUserVIP extends Omit<IVipResponse, 'HasVipka'> {
    /**
     * Flag indicating wheter a player has enabled VIP feature or not. Same as {@link IVipResponse.HasVipka | IVipResponse.HasVipka}
     */
    enabled: boolean;
}
