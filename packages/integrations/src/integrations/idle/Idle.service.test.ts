import { ForbiddenException, NotFoundException } from '@nestjs/common';

import { Test } from '@nestjs/testing';

import axios from 'axios';

import { safeExtract } from '@idle-discord-bot/utils';

import { IDLE_API_OPTIONS } from '@/constants';

import { PunishmentName } from '@integrations/idle/enums';

import * as transformators from './transformators';

import { INVALID_TOKEN } from './constants';

import { IdleService } from './Idle.service';

import type { IdleAPIOptions } from '@/types';

import type {
    IFailedResponse,
    IBasePunishment,
    IPunishmentList,
} from '@integrations/idle/types/common';
import type { ISuccessfulGetProfileResponse } from '@integrations/idle/types/profileResponse';

import type {
    IdleUserProfile,
    IdleUserPunishment,
    IdleUserPunishmentHistory,
} from './transformators';

const steamIDValue = '__steam_id__';
const tokenValue = '__test_idle_service_token__';

const forbiddenExceptionData = {
    message: INVALID_TOKEN,
    value: `Idle service: ${tokenValue}`,
};

const idleAPIOptions: IdleAPIOptions = {
    token: tokenValue,
    url: '__test_idle_service_url__',
};

jest.spyOn(axios, 'create').mockImplementation(() => axios);

describe('IdleService', () => {
    let idleService: IdleService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [{ provide: IDLE_API_OPTIONS, useValue: idleAPIOptions }, IdleService],
        }).compile();

        idleService = moduleRef.get(IdleService);
    });

    describe('getProfile', () => {
        const profileResponse = {} as ISuccessfulGetProfileResponse;

        const userVipProfile: IdleUserProfile['vip'] = {
            enabled: false,
            created: 0,
            ends: 0,
            length: 0,
        };
        const userRankProfile: IdleUserProfile['rank'] = {
            currentPoints: 9999,
            currentRank: '__test_current_rank__',
            nextPoints: 10000,
            nextRank: '__test_next_rank',
        };
        const userProfile: IdleUserProfile = {
            rank: userRankProfile,
            vip: userVipProfile,
        };

        beforeEach(() => {
            jest.spyOn(axios, 'get').mockResolvedValue({ data: profileResponse });
            jest.spyOn(transformators, 'profileTransformator').mockReturnValue(userProfile);
        });

        it('should return userProfile object', async () => {
            const profile = await idleService.getProfile(steamIDValue);
            expect(profile.unsafeCoerce()).toEqual(userProfile);
        });

        it('should throw NotFoundException if user is not found', async () => {
            jest.spyOn(axios, 'get').mockResolvedValue({
                data: { ResultCode: 2 } as IFailedResponse,
            });

            const profile = await idleService.getProfile(steamIDValue);
            expect(() => safeExtract(profile)).toThrow(new NotFoundException(steamIDValue));
        });

        it('should throw ForbiddenException if the token is invalid', async () => {
            jest.spyOn(axios, 'get').mockResolvedValue({
                data: INVALID_TOKEN,
            });

            const profile = await idleService.getProfile(steamIDValue);
            expect(() => safeExtract(profile)).toThrow(
                new ForbiddenException(forbiddenExceptionData),
            );
        });
    });

    describe('getCurrentMute', () => {
        const currentMuteResponse = {} as IBasePunishment;

        const userMute: IdleUserPunishment = {
            created: 111,
            ends: 111,
            name: '__current_mute_test_name__',
            method: '__current_mute_test_method__',
            reason: '__current_mute_test_reason__',
            type: PunishmentName.SILENCE,
            removedBy: null,
            removedOn: null,
            removeReason: null,
            removeType: null,
        };

        beforeEach(() => {
            jest.spyOn(axios, 'get').mockResolvedValue({ data: currentMuteResponse });
            jest.spyOn(transformators, 'punishmentTransformator').mockReturnValue(userMute);
        });

        it('should return userMute object', async () => {
            const currentMute = await idleService.getCurrentMute(steamIDValue);
            expect(currentMute.extract()).toEqual(userMute);
        });

        it('should return null if user is not found', async () => {
            jest.spyOn(axios, 'get').mockResolvedValue({
                data: { ResultCode: 2 } as IFailedResponse,
            });

            const currentMute = await idleService.getCurrentMute(steamIDValue);
            expect(currentMute.extract()).toBeNull();
        });

        it('should throw ForbiddenException if the token is invalid', async () => {
            jest.spyOn(axios, 'get').mockResolvedValue({
                data: INVALID_TOKEN,
            });

            const currentMute = await idleService.getCurrentMute(steamIDValue);
            expect(() => safeExtract(currentMute)).toThrow(
                new ForbiddenException(forbiddenExceptionData),
            );
        });
    });

    describe('getCurrentBan', () => {
        const currentBanResponse = {} as IBasePunishment;

        const userBan: IdleUserPunishment = {
            created: 111,
            ends: 111,
            name: '__current_ban_test_name__',
            method: '__current_ban_test_method__',
            reason: '__current_ban_test_reason__',
            type: PunishmentName.BAN,
            removedBy: null,
            removedOn: null,
            removeReason: null,
            removeType: null,
        };

        beforeEach(() => {
            jest.spyOn(axios, 'get').mockResolvedValue({ data: currentBanResponse });
            jest.spyOn(transformators, 'punishmentTransformator').mockReturnValue(userBan);
        });

        it('should return userBan object', async () => {
            const currentBan = await idleService.getCurrentBan(steamIDValue);
            expect(currentBan.extract()).toEqual(userBan);
        });

        it('should return null if user is not found', async () => {
            jest.spyOn(axios, 'get').mockResolvedValue({
                data: { ResultCode: 2 } as IFailedResponse,
            });

            const currentBan = await idleService.getCurrentBan(steamIDValue);
            expect(currentBan.extract()).toBeNull();
        });

        it('should throw ForbiddenException if the token is invalid', async () => {
            jest.spyOn(axios, 'get').mockResolvedValue({
                data: INVALID_TOKEN,
            });

            const currentBan = await idleService.getCurrentBan(steamIDValue);
            expect(() => safeExtract(currentBan)).toThrow(
                new ForbiddenException(forbiddenExceptionData),
            );
        });
    });

    describe('getMutesHistory', () => {
        const mutesHistoryResponse = {} as IPunishmentList;

        const muteItem: IdleUserPunishment = {
            created: 111,
            ends: 111,
            name: '__current_mute_test_name__',
            method: '__current_mute_test_method__',
            reason: '__current_mute_test_reason__',
            type: PunishmentName.SILENCE,
            removedBy: null,
            removedOn: null,
            removeReason: null,
            removeType: null,
        };

        const userMutesHistory: IdleUserPunishmentHistory = {
            length: 3,
            items: new Array(3).fill({ ...muteItem }),
        };

        const emptyUserMutesHistory: IdleUserPunishmentHistory = {
            length: 0,
            items: [],
        };

        beforeEach(() => {
            jest.spyOn(axios, 'get').mockResolvedValue({
                data: mutesHistoryResponse,
            });
            jest.spyOn(transformators, 'punishmentHistoryTransformator')
                .mockClear()
                .mockReturnValue(userMutesHistory);
        });

        it('should return userMutesHistory', async () => {
            const mutesHistory = await idleService.getMutesHistory(steamIDValue);
            expect(mutesHistory.extract()).toEqual(userMutesHistory);
        });

        it('should return empty array of items if no mutes found', async () => {
            jest.spyOn(axios, 'get').mockResolvedValue({
                data: { ResultCode: 2 },
            });

            const mockedPunishmentHistoryTransformator = jest
                .spyOn(transformators, 'punishmentHistoryTransformator')
                .mockReturnValue(emptyUserMutesHistory);

            const mutesHistory = await idleService.getMutesHistory(steamIDValue);
            expect(mutesHistory.extract()).toEqual(emptyUserMutesHistory);

            expect(mockedPunishmentHistoryTransformator.mock.calls[0][0]).toEqual({
                ResultCode: 1,
                Items: [],
            });
        });

        it('should throw ForbiddenException if the token is invalid', async () => {
            jest.spyOn(axios, 'get').mockResolvedValue({
                data: INVALID_TOKEN,
            });

            const mutesHistory = await idleService.getMutesHistory(steamIDValue);
            expect(() => safeExtract(mutesHistory)).toThrow(
                new ForbiddenException(forbiddenExceptionData),
            );
        });
    });

    describe('getBansHistory', () => {
        const bansHistoryResponse = {} as IPunishmentList;

        const banItem: IdleUserPunishment = {
            created: 111,
            ends: 111,
            name: '__current_ban_test_name__',
            method: '__current_ban_test_method__',
            reason: '__current_ban_test_reason__',
            type: PunishmentName.BAN,
            removedBy: null,
            removedOn: null,
            removeReason: null,
            removeType: null,
        };

        const userBansHistory: IdleUserPunishmentHistory = {
            length: 3,
            items: new Array(3).fill({ ...banItem }),
        };

        const emptyUserBansHistory: IdleUserPunishmentHistory = {
            length: 0,
            items: [],
        };

        beforeEach(() => {
            jest.spyOn(axios, 'get').mockResolvedValue({
                data: bansHistoryResponse,
            });
            jest.spyOn(transformators, 'punishmentHistoryTransformator').mockReturnValue(
                userBansHistory,
            );
        });

        it('should return userBansHistory', async () => {
            const bansHistory = await idleService.getBansHistory(steamIDValue);
            expect(bansHistory.extract()).toEqual(userBansHistory);
        });

        it('should return empty array of items if no bans found', async () => {
            jest.spyOn(axios, 'get').mockResolvedValue({
                data: { ResultCode: 2 },
            });

            const mockedPunishmentHistoryTransformator = jest
                .spyOn(transformators, 'punishmentHistoryTransformator')
                .mockReturnValue(emptyUserBansHistory);

            const bansHistory = await idleService.getBansHistory(steamIDValue);
            expect(bansHistory.extract()).toEqual(emptyUserBansHistory);

            expect(mockedPunishmentHistoryTransformator.mock.calls[0][0]).toEqual({
                ResultCode: 1,
                Items: [],
            });
        });

        it('should throw ForbiddenException if the token is invalid', async () => {
            jest.spyOn(axios, 'get').mockResolvedValue({
                data: INVALID_TOKEN,
            });

            const bansHistory = await idleService.getBansHistory(steamIDValue);
            expect(() => safeExtract(bansHistory)).toThrow(
                new ForbiddenException(forbiddenExceptionData),
            );
        });
    });
});
