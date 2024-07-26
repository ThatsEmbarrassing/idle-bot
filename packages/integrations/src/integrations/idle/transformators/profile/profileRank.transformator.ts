import type { ISuccessfulGetProfileResponse as IProfileResponse } from '../../types/profileResponse';

import type { IdleUserRank } from './types';

const COUNT_OF_SPECIAL_RANKS = 8;

export const profileRankTransformator = (profile: IProfileResponse): IdleUserRank => {
    const {
        Rank: { Rank: currentRank, points: currentPoints },
        Ranks: ranksTable,
        Points: pointsTable,
    } = profile;

    const currentRankIndex = ranksTable.findIndex((rank) => rank === currentRank);

    const isMaxRank = currentRankIndex >= pointsTable.length - COUNT_OF_SPECIAL_RANKS;

    const nextRank = !isMaxRank ? ranksTable[currentRankIndex + 1] : null;
    const nextPoints = !isMaxRank ? pointsTable[currentRankIndex + 1] : null;

    return {
        currentRank,
        currentPoints,
        nextPoints,
        nextRank,
    };
};
