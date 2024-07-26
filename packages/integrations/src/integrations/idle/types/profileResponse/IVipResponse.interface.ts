/**
 * Information about player's VIP status
 */
export interface IVipResponse {
    /**
     * Flag indicating wheter a player has enabled VIP feature or not
     */
    HasVipka: boolean;
    /**
     * Timestamp when a player bought the VIP (0 if VIP is disabled)
     */
    created: number;
    /**
     * Duration of VIP validity (0 if VIP is disabled)
     */
    length: number;
    /**
     * Timestamp when VIP ends (0 if VIP is disabled)
     */
    ends: number;
}
