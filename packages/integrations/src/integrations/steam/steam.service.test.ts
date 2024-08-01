import { NotFoundException, HttpException } from '@nestjs/common';

import { Test } from '@nestjs/testing';

import axios from 'axios';

import { safeExtract } from '@idle-discord-bot/utils';

import { STEAM_API_OPTIONS } from '@/constants';

import { SteamService } from './steam.service';

import type { AxiosError } from 'axios';

import type { SteamAPIOptions } from '@/types';

import type {
    ISteamSummaries,
    ISteamPlayerBans,
    ISuccessfulResolveURLResponse,
    IFailedResolveURLResponse,
} from './types';

const steamIDValue = '__steam_id__';
const tokenValue = '__test_idle_service_token__';

const steamAPIOptions: SteamAPIOptions = {
    token: tokenValue,
};

jest.spyOn(axios, 'create').mockImplementation(() => axios);

describe('SteamService', () => {
    let steamService: SteamService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [{ provide: STEAM_API_OPTIONS, useValue: steamAPIOptions }, SteamService],
        }).compile();

        steamService = moduleRef.get(SteamService);
    });

    describe('getPlayerSummaries', () => {
        const persionaName = '__steam_service_test_persona_name__';
        const summaries = [{ personaname: persionaName }] as ISteamSummaries[];

        beforeEach(() => {
            jest.spyOn(axios, 'get').mockResolvedValue({
                data: { response: { players: summaries } },
            });
        });

        it('should return the first element of summaries array', async () => {
            const playerSummaries = await steamService.getPlayerSummaries(steamIDValue);
            expect(playerSummaries.extract()).toEqual(summaries[0]);
        });

        it('should throw HttpException if an error occured while requesting', async () => {
            const axiosError = {
                message: '__steam_service_test_axios_error_message__',
                response: { status: 400 },
                cause: new Error('__steam_service_test_axios_error_cause'),
            } as AxiosError;

            jest.spyOn(axios, 'get').mockImplementation(() => {
                throw axiosError;
            });

            const playerSummaries = await steamService.getPlayerSummaries(steamIDValue);
            expect(() => safeExtract(playerSummaries)).toThrow(
                new HttpException(axiosError.message, axiosError.response?.status!, {
                    cause: axiosError.cause,
                }),
            );
        });

        it('should throw NotFoundException if user is not found', async () => {
            jest.spyOn(axios, 'get').mockResolvedValue({
                data: { response: { players: [] } },
            });

            const playerSummaries = await steamService.getPlayerSummaries(steamIDValue);
            expect(() => safeExtract(playerSummaries)).toThrow(new NotFoundException(steamIDValue));
        });
    });

    describe('getPlayerBans', () => {
        const bans = [{ SteamId: steamIDValue }] as ISteamPlayerBans[];

        beforeEach(() => {
            jest.spyOn(axios, 'get').mockResolvedValue({
                data: { players: bans },
            });
        });

        it('should return the first element of bans array', async () => {
            const playerBans = await steamService.getPlayerBans(steamIDValue);
            expect(playerBans.extract()).toEqual(bans[0]);
        });

        it('should throw HttpException if an error occured while requesting', async () => {
            const axiosError = {
                message: '__steam_service_test_axios_error_message__',
                response: { status: 400 },
                cause: new Error('__steam_service_test_axios_error_cause'),
            } as AxiosError;

            jest.spyOn(axios, 'get').mockImplementation(() => {
                throw axiosError;
            });

            const playerBans = await steamService.getPlayerBans(steamIDValue);
            expect(() => safeExtract(playerBans)).toThrow(
                new HttpException(axiosError.message, axiosError.response?.status!, {
                    cause: axiosError.cause,
                }),
            );
        });

        it('should throw NotFoundException if user is not found', async () => {
            jest.spyOn(axios, 'get').mockResolvedValue({
                data: { players: [] },
            });

            const playerBans = await steamService.getPlayerBans(steamIDValue);
            expect(() => safeExtract(playerBans)).toThrow(new NotFoundException(steamIDValue));
        });
    });

    describe('resolveURL', () => {
        const vanityValue = '__steam_service_test_vanity__';
        const resolvedURL: ISuccessfulResolveURLResponse = {
            success: 1,
            steamid: steamIDValue,
        };

        beforeEach(() => {
            jest.spyOn(axios, 'get').mockResolvedValue({
                data: { response: resolvedURL },
            });
        });

        it('should return resolvedURL object', async () => {
            const playerResolvedURL = await steamService.resolveURL(vanityValue);
            expect(playerResolvedURL.extract()).toEqual(resolvedURL);
        });

        it('should throw HttpException if an error occured while requesting', async () => {
            const axiosError = {
                message: '__steam_service_test_axios_error_message__',
                response: { status: 400 },
                cause: new Error('__steam_service_test_axios_error_cause'),
            } as AxiosError;

            jest.spyOn(axios, 'get').mockImplementation(() => {
                throw axiosError;
            });

            const playerResolvedURL = await steamService.resolveURL(vanityValue);
            expect(() => safeExtract(playerResolvedURL)).toThrow(
                new HttpException(axiosError.message, axiosError.response?.status!, {
                    cause: axiosError.cause,
                }),
            );
        });

        it('should throw NotFoundException if user is not found', async () => {
            const resolvedURL: IFailedResolveURLResponse = {
                success: 42,
                message: 'No match',
            };

            jest.spyOn(axios, 'get').mockResolvedValue({
                data: { response: resolvedURL },
            });

            const playerResolvedURL = await steamService.resolveURL(vanityValue);
            expect(() => safeExtract(playerResolvedURL)).toThrow(
                new NotFoundException(vanityValue),
            );
        });
    });
});
