import { profileTransformator } from './profile.transformator';

import * as profileRank from './profileRank.transformator';
import * as profileVip from './profileVip.transformator';

import type { ISuccessfulGetProfileResponse as IProfileResponse } from '@integrations/idle/types';

import type { IdleUserRank, IdleUserVIP, IdleUserProfile } from './types';

const expectedUserRank: IdleUserRank = {
    currentRank: 'Мл. Сержант',
    currentPoints: 150000,
    nextRank: 'Сержант',
    nextPoints: 201600,
};

const expectedUserVip: IdleUserVIP = {
    enabled: false,
    created: 0,
    ends: 0,
    length: 0,
};

jest.spyOn(profileRank, 'profileRankTransformator').mockReturnValue(expectedUserRank);
jest.spyOn(profileVip, 'profileVipTransformator').mockReturnValue(expectedUserVip);

const profile = {} as IProfileResponse;

const expectedUserProfile: IdleUserProfile = {
    rank: expectedUserRank,
    vip: expectedUserVip,
};

describe('profile transformator', () => {
    it("should return modified object about player's common information", () => {
        const userProfile = profileTransformator(profile);
        expect(userProfile).toEqual(expectedUserProfile);
    });
});
