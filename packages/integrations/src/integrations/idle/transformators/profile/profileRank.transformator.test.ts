import { profileRankTransformator } from './profileRank.transformator';

import type { ISuccessfulGetProfileResponse as IProfileResponse } from '@/integrations/idle/types';

import type { IdleUserRank } from './types';

const rank: IProfileResponse['Rank'] = {
    Rank: 'Рядовой',
    points: 9280,
};

const specialRank: IProfileResponse['Rank'] = {
    Rank: 'Шухер',
    points: -1,
};

const ranksTable: IProfileResponse['Ranks'] = [
    'Рядовой',
    'Ефрейтор',
    'Мл. Сержант',
    'Сержант',
    'Ст. Сержант',
    'Старшина',
    'Прапорщик',
    'Ст. Прапорщик',
    'Мл. Лейтенант',
    'Лейтенант',
    'Ст. Лейтенант',
    'Капитан',
    'Майор',
    'Подполковник',
    'Полковник',
    'Генерал-майор',
    'Генерал-лейтенант',
    'Генерал-полковник',
    'Генерал',
    'Маршал',
    'Командор',
    'Шухер',
    'Алиса',
    'Капрал',
    'Бот',
    'Павший ветеран',
];

const ranksPointsTable: IProfileResponse['Points'] = [
    0, 10000, 86400, 201600, 288000, 403200, 518400, 604800, 864000, 1728000, 2131200, 2995200,
    4320000, 5184000, 6451200, 7776000, 9043200, 10512000, 999999999, 999999999, -1, -1, -1, -1, -1,
    -1,
];

const profile = {
    Rank: rank,
    Ranks: ranksTable,
    Points: ranksPointsTable,
} as IProfileResponse;

const specialRankProfile = {
    Rank: specialRank,
    Ranks: ranksTable,
    Points: ranksPointsTable,
} as IProfileResponse;

const expectedUserRank: IdleUserRank = {
    currentRank: rank.Rank,
    currentPoints: rank.points,
    nextRank: 'Ефрейтор',
    nextPoints: 10000,
};

const expectedUserSpecialRank: IdleUserRank = {
    currentRank: specialRank.Rank,
    currentPoints: specialRank.points,
    nextRank: null,
    nextPoints: null,
};

describe('profileRank transformator', () => {
    it("should return modified object about player's rank information", () => {
        const userRank = profileRankTransformator(profile);
        expect(userRank).toEqual(expectedUserRank);
    });

    it("should return modified object about player's special rank information", () => {
        const userRank = profileRankTransformator(specialRankProfile);
        expect(userRank).toEqual(expectedUserSpecialRank);
    });
});
