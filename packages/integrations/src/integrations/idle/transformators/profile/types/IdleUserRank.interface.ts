/**
 * Modified information about player's activity rank
 */
export interface IdleUserRank {
    /**
     * Current player's rank
     */
    currentRank: string;
    /**
     * Current player's rank points
     */
    currentPoints: number;
    /**
     * Player's next rank (null if current rank is maximum or special)
     */
    nextRank: string | null;
    /**
     * Player's next rank points (null if current rank is maximum or special)
     */
    nextPoints: number | null;
}
