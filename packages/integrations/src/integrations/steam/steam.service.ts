import { HttpException, Injectable, Inject, NotFoundException } from '@nestjs/common';

import axios from 'axios';

import { Either, Left as left, Right as right } from 'purify-ts';

import { STEAM_API_OPTIONS } from '../../constants';

import { ApiMethod } from './enum';

import type { SteamAPIOptions } from '../../types';

import type { AxiosInstance } from 'axios';

import type { ISteamSummaries, ISteamPlayerBans } from './types';

@Injectable()
export class SteamService {
    private readonly baseSteamAPIUrl = 'http://api.steampowered.com';

    private readonly axiosInstance: AxiosInstance;

    private async getResponse<T>(
        method: ApiMethod,
        steamID: string,
    ): Promise<Either<HttpException, T>> {
        const { token } = this.options;

        const url = `${this.baseSteamAPIUrl}/${method}?key=${token}&steamids=${steamID}`;

        const { data } = await this.axiosInstance.get<T>(url);

        return Either.of(data);
    }

    constructor(@Inject(STEAM_API_OPTIONS) private readonly options: SteamAPIOptions) {
        this.axiosInstance = axios.create({ timeout: 5000 });
    }

    async getPlayerSummaries(steamID: string) {
        const data = await this.getResponse<{ response: { players: ISteamSummaries[] } }>(
            ApiMethod.GET_PLAYER_SUMMARIES,
            steamID,
        );

        return data
            .map((value) => value.response.players[0])
            .chain((value) =>
                value === undefined ? left(new NotFoundException(steamID)) : right(value),
            );
    }

    async getPlayerBans(
        steamID: string,
    ): Promise<Either<HttpException | NotFoundException, ISteamPlayerBans>> {
        const data = await this.getResponse<{ players: ISteamPlayerBans[] }>(
            ApiMethod.GET_PLAYER_BANS,
            steamID,
        );

        return data
            .map((value) => value.players[0])
            .chain((value) => (value === undefined ? left(new NotFoundException()) : right(value)));
    }
}
