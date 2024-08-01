import { Test } from '@nestjs/testing';

import { Either } from 'purify-ts/Either';

import { ID as SteamID } from '@node-steam/id';

import { IdleService, SteamService } from '@/integrations';

import { IDLE_API_OPTIONS, STEAM_API_OPTIONS } from '@/constants';

import { PunishmentName } from '@integrations/idle/enums';

import { ProfileFactory } from './profile.factory';

import type {
    IdleUserProfile,
    IdleUserPunishment,
    IdleUserPunishmentHistory,
    ISteamSummaries,
    ISteamPlayerBans,
} from '@/integrations';

import type { IdleAPIOptions, SteamAPIOptions } from '@/types';

import type { ICombinedProfile } from './types';

jest.mock('@node-steam/id', () => {
    const original = jest.requireActual('@node-steam/id');

    const mockGet2 = jest.fn().mockReturnValue('__profile_factory_test_mock_steam_id_get2__');
    const mockGet64 = jest.fn().mockReturnValue('__profile_factory_test_mock_steam_id_get2__');

    const ID = jest.fn().mockReturnValue({
        get2: mockGet2,
        get64: mockGet64,
    });

    return {
        ...original,
        ID,
    };
});

const idleApiOptions: IdleAPIOptions = {
    token: '__profile_factory_test_idle_api_token__',
    url: '__profile_factory_test_idle_api_url__',
};

const steamApiOptions: SteamAPIOptions = {
    token: '__profile_factory_test_steam_api_token__',
};

describe('profileFactory', () => {
    let profileFactory: ProfileFactory;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                { provide: IDLE_API_OPTIONS, useValue: idleApiOptions },
                { provide: STEAM_API_OPTIONS, useValue: steamApiOptions },
                IdleService,
                SteamService,
                ProfileFactory,
            ],
        }).compile();

        profileFactory = moduleRef.get(ProfileFactory);
    });

    describe('combineAll', () => {
        // Idle Service
        const profileRank: IdleUserProfile['rank'] = {
            currentRank: '__profile_factory_test_profile_current_rank__',
            currentPoints: 1111,
            nextRank: '__profile_factory_test_next_rank',
            nextPoints: 10000,
        };
        const profileVip: IdleUserProfile['vip'] = {
            enabled: false,
            created: 0,
            ends: 0,
            length: 0,
        };
        const profile: IdleUserProfile = {
            rank: profileRank,
            vip: profileVip,
        };

        const userMute: IdleUserPunishment = {
            name: '__profile_factory_test_current_mute_name__',
            created: 1111,
            ends: 1111,
            method: 'Web',
            type: PunishmentName.SILENCE,
            reason: '__profile_factory_test_current_mute_reason',
            removedBy: null,
            removedOn: null,
            removeReason: null,
            removeType: null,
        };

        const userBan: IdleUserPunishment = {
            name: '__profile_factory_test_current_ban_name__',
            created: 1111,
            ends: 1111,
            method: 'Web',
            type: PunishmentName.BAN,
            reason: '__profile_factory_test_current_ban_reason',
            removedBy: null,
            removedOn: null,
            removeReason: null,
            removeType: null,
        };

        const userMutesHistory: IdleUserPunishmentHistory = {
            length: 3,
            items: new Array(3).fill(userMute),
        };

        const userBansHistory: IdleUserPunishmentHistory = {
            length: 3,
            items: new Array(3).fill(userBan),
        };

        // Steam Service
        const playerSummaries = {
            personaname: '__profile_factory_test_player_summaries_persona_name__',
            steamid: '__profile_factory_test_player_summaries_steamid__',
            profileurl: '__profile_factory_test_player_summaries_profileurl__',
            avatarfull: '__profile_factory_test_player_summaries_avatarfull__',
        } as ISteamSummaries;

        const playerBans = {
            VACBanned: false,
        } as ISteamPlayerBans;

        const expectedCombinedProfile: ICombinedProfile = {
            ...profile,
            nickname: playerSummaries.personaname,
            steamid: '__profile_factory_test_mock_steam_id_get2__',
            profileurl: playerSummaries.profileurl,
            avatar: playerSummaries.avatarfull,
            vac: playerBans.VACBanned,
            punishments: {
                mutes: {
                    current: userMute,
                    history: userMutesHistory,
                },
                bans: {
                    current: userBan,
                    history: userBansHistory,
                },
            },
        };

        beforeEach(() => {
            // Idle Service
            jest.spyOn(IdleService.prototype, 'getProfile').mockResolvedValue(Either.of(profile));

            jest.spyOn(IdleService.prototype, 'getCurrentMute').mockResolvedValue(
                Either.of(userMute),
            );
            jest.spyOn(IdleService.prototype, 'getCurrentBan').mockResolvedValue(
                Either.of(userBan),
            );

            jest.spyOn(IdleService.prototype, 'getMutesHistory').mockResolvedValue(
                Either.of(userMutesHistory),
            );
            jest.spyOn(IdleService.prototype, 'getBansHistory').mockResolvedValue(
                Either.of(userBansHistory),
            );

            // Steam Service
            jest.spyOn(SteamService.prototype, 'getPlayerSummaries').mockResolvedValue(
                Either.of(playerSummaries),
            );
            jest.spyOn(SteamService.prototype, 'getPlayerBans').mockResolvedValue(
                Either.of(playerBans),
            );
        });

        it('should return combined object', async () => {
            const result = await profileFactory.getProfile(new SteamID());
            expect(result).toEqual(expectedCombinedProfile);
        });
    });
});
