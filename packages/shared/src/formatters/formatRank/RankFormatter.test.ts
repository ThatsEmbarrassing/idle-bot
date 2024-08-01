import { constructFormatter } from '@idle-discord-bot/utils';

import { RankFormatter } from './RankFormatter';

import type { IdleUserRank } from '@idle-discord-bot/integrations';

const formatRank = constructFormatter(RankFormatter);

describe('RankFormatter', () => {
    const commonCurrentRankValue = '__rank_formatter_test_common_current_rank__';
    const commonNextRankValue = '__rank_formatter_test_common_next_rank__';

    const specialCurrentRankValue = '__rank_formatter_test_special_current_rank__';

    const commonUserRank: IdleUserRank = {
        currentPoints: 5555,
        currentRank: commonCurrentRankValue,
        nextPoints: 10000,
        nextRank: commonNextRankValue,
    };

    const specialUserRank: IdleUserRank = {
        currentPoints: -1,
        currentRank: specialCurrentRankValue,
        nextPoints: null,
        nextRank: null,
    };

    it('should format common rank', () => {
        const { currentRank, currentPoints, nextRank, nextPoints } = commonUserRank;
        const expectedFormattedCommonRank = `Текущий ранг - \`${currentRank}(${currentPoints})\`.\nДо ранга \`${nextRank}(${nextPoints})\` осталось ${nextPoints! - currentPoints} очков.`;

        expect(formatRank(commonUserRank)).toBe(expectedFormattedCommonRank);
    });

    it('should format special rank', () => {
        const { currentRank, currentPoints } = specialUserRank;
        const expectedFormattedSpecialRank = `Текущий ранг - \`${currentRank}(${currentPoints})\`.`;

        expect(formatRank(specialUserRank)).toBe(expectedFormattedSpecialRank);
    });
});
