import { HttpException, Injectable, Inject, NotFoundException } from '@nestjs/common';

import axios from 'axios';

import { UrlBuilder } from '@innova2/url-builder';

import { Either, Left as left, Right as right } from 'purify-ts';

import { STEAM_API_OPTIONS } from '../../constants';

import { ApiMethod } from './enum';

import type { SteamAPIOptions } from '../../types';

import type { AxiosError, AxiosInstance } from 'axios';

import {
    type ISteamSummaries,
    type ISteamPlayerBans,
    type ISuccessfulResolveURLResponse as ResolvedURL,
    ResolveURLResponse,
} from './types';

@Injectable()
export class SteamService {
    private readonly baseSteamAPIUrl = 'http://api.steampowered.com';

    private readonly axiosInstance: AxiosInstance;

    private async getResponse<T>(url: string): Promise<Either<HttpException, T>> {
        try {
            const { data } = await this.axiosInstance.get<T>(url);

            return Either.of(data);
        } catch (err) {
            const axiosError = err as AxiosError;
            return left(
                new HttpException(axiosError.message, axiosError.response!.status, {
                    cause: axiosError.cause,
                }),
            );
        }
    }

    constructor(@Inject(STEAM_API_OPTIONS) private readonly options: SteamAPIOptions) {
        this.axiosInstance = axios.create({ timeout: 5000 });
    }

    async getPlayerSummaries(steamID: string) {
        const { token } = this.options;

        const url = UrlBuilder.createFromUrl(this.baseSteamAPIUrl)
            .addPath(ApiMethod.GET_PLAYER_SUMMARIES)
            .addQueryParam('key', token)
            .addQueryParam('steamids', steamID)
            .toString();

        const data = await this.getResponse<{ response: { players: ISteamSummaries[] } }>(url);

        return data
            .map(({ response: { players } }) => players[0])
            .chain((value) =>
                value === undefined ? left(new NotFoundException(steamID)) : right(value),
            );
    }

    async getPlayerBans(
        steamID: string,
    ): Promise<Either<HttpException | NotFoundException, ISteamPlayerBans>> {
        const { token } = this.options;

        const url = UrlBuilder.createFromUrl(this.baseSteamAPIUrl)
            .addPath(ApiMethod.GET_PLAYER_BANS)
            .addQueryParam('key', token)
            .addQueryParam('steamids', steamID)
            .toString();

        const data = await this.getResponse<{ players: ISteamPlayerBans[] }>(url);

        console.log(data.unsafeCoerce());

        return data
            .map(({ players }) => players[0])
            .chain((value) => (value === undefined ? left(new NotFoundException()) : right(value)));
    }

    async resolveURL(
        vanityurl: string,
    ): Promise<Either<HttpException | NotFoundException, ResolvedURL>> {
        const { token } = this.options;

        const url = UrlBuilder.createFromUrl(this.baseSteamAPIUrl)
            .addPath(ApiMethod.RESOLVE_URL)
            .addQueryParam('key', token)
            .addQueryParam('vanityurl', vanityurl)
            .toString();

        const data = await this.getResponse<{ response: ResolveURLResponse }>(url);

        return data
            .map(({ response }) => response)
            .chain((value) =>
                //! `value.success === 42` means that a user with this vanity is not found
                value.success === 42 ? left(new NotFoundException(vanityurl)) : right(value),
            );
    }
}
