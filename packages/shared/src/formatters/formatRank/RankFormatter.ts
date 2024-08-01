import { IFormatter } from '@idle-discord-bot/utils';

import type { IdleUserRank } from '@idle-discord-bot/integrations';

export class RankFormatter implements IFormatter<IdleUserRank> {
    private currentRankStats(data: IdleUserRank) {
        const { currentRank, currentPoints } = data;

        return `Текущий ранг - \`${currentRank}(${currentPoints})\`.`;
    }

    private rankPointsDifference(data: IdleUserRank) {
        const { currentPoints, nextPoints } = data;

        return nextPoints! - currentPoints;
    }

    private nextRankStats(data: IdleUserRank) {
        const { nextRank, nextPoints } = data;

        if (!nextRank || !nextPoints) return '';

        return `До ранга \`${nextRank}(${nextPoints})\` осталось ${this.rankPointsDifference(data)} очков.`;
    }

    format(data: IdleUserRank) {
        return `${this.currentRankStats(data)}\n${this.nextRankStats(data)}`.trim();
    }
}
