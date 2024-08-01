import {
    HttpException,
    Injectable,
    Inject,
    ForbiddenException,
    NotFoundException,
} from '@nestjs/common';

import axios from 'axios';

import { Either, Left as left, Right as right } from 'purify-ts';

import { IDLE_API_OPTIONS } from '@/constants';

import { ApiMethod } from './enums';
import { INVALID_TOKEN } from './constants';

import {
    profileTransformator,
    punishmentTransformator,
    punishmentHistoryTransformator,
} from './transformators';

import type { AxiosInstance } from 'axios';

import type { IdleAPIOptions } from '@/types';

import type { CurrentBanResponse } from './types/currentBanResponse';
import type { CurrentMuteResponse } from './types/currentMuteResponse';
import type { MutesHistoryResponse } from './types/mutesHistoryResponse';
import type { BansHistoryResponse } from './types/bansHistoryResponse';
import type { GetProfileResponse } from './types/profileResponse';
import type { IFailedResponse, IPunishmentList } from './types/common';

import type { IdleUserProfile } from './transformators/profile';
import type { IdleUserPunishment } from './transformators/punishment';
import type { IdleUserPunishmentHistory } from './transformators/punishmentHistory';

@Injectable()
export class IdleService {
    private readonly axiosInstance: AxiosInstance;

    private async getResponse<T>(
        method: ApiMethod,
        steamID: string,
    ): Promise<Either<HttpException, T>> {
        const { token, url } = this.options;

        const { data } = await this.axiosInstance.get<T>(
            `${url}?token=${token}&arg=${method}&steamid=${steamID}`,
        );

        return Either.of(data);
    }

    private isFailedResponse(value: unknown): value is IFailedResponse {
        return (
            !!value && typeof value === 'object' && 'ResultCode' in value && value.ResultCode === 2
        );
    }

    constructor(@Inject(IDLE_API_OPTIONS) private readonly options: IdleAPIOptions) {
        this.axiosInstance = axios.create({
            timeout: 5000,
        });
    }

    async getProfile(steamID: string): Promise<Either<HttpException, IdleUserProfile>> {
        const { token } = this.options;

        const data = await this.getResponse<GetProfileResponse>(ApiMethod.GET_PROFILE, steamID);

        return data
            .chain((value) =>
                value === INVALID_TOKEN
                    ? left(
                          new ForbiddenException({
                              message: INVALID_TOKEN,
                              value: `Idle service: ${token}`,
                          }),
                      )
                    : right(value),
            )
            .chain((value) =>
                this.isFailedResponse(value) ? left(new NotFoundException(steamID)) : right(value),
            )
            .map(profileTransformator);
    }

    async getCurrentMute(
        steamID: string,
    ): Promise<Either<HttpException | null, IdleUserPunishment>> {
        const { token } = this.options;

        const data = await this.getResponse<CurrentMuteResponse>(
            ApiMethod.GET_CURRENT_MUTE,
            steamID,
        );

        return data
            .chain((value) =>
                value === INVALID_TOKEN
                    ? left(
                          new ForbiddenException({
                              message: INVALID_TOKEN,
                              value: `Idle service: ${token}`,
                          }),
                      )
                    : right(value),
            )
            .chain((value) => (this.isFailedResponse(value) ? left(null) : right(value)))
            .map(punishmentTransformator);
    }

    async getCurrentBan(
        steamID: string,
    ): Promise<Either<HttpException | null, IdleUserPunishment>> {
        const { token } = this.options;

        const data = await this.getResponse<CurrentBanResponse>(ApiMethod.GET_CURRENT_BAN, steamID);

        return data
            .chain((value) =>
                value === INVALID_TOKEN
                    ? left(
                          new ForbiddenException({
                              message: INVALID_TOKEN,
                              value: `Idle service: ${token}`,
                          }),
                      )
                    : right(value),
            )
            .chain((value) => (this.isFailedResponse(value) ? left(null) : right(value)))
            .map(punishmentTransformator);
    }

    async getMutesHistory(
        steamID: string,
    ): Promise<Either<HttpException | IdleUserPunishmentHistory, IdleUserPunishmentHistory>> {
        const { token } = this.options;

        const data = await this.getResponse<MutesHistoryResponse>(
            ApiMethod.GET_MUTES_HISTORY,
            steamID,
        );

        return data
            .chain((value) =>
                value === INVALID_TOKEN
                    ? left(
                          new ForbiddenException({
                              message: INVALID_TOKEN,
                              value: `Idle service: ${token}`,
                          }),
                      )
                    : right(value),
            )
            .map((value) =>
                this.isFailedResponse(value)
                    ? ({ ResultCode: 1, Items: [] } as IPunishmentList)
                    : value,
            )
            .map(punishmentHistoryTransformator);
    }

    async getBansHistory(
        steamID: string,
    ): Promise<Either<HttpException | IdleUserPunishmentHistory, IdleUserPunishmentHistory>> {
        const { token } = this.options;

        const data = await this.getResponse<BansHistoryResponse>(
            ApiMethod.GET_BANS_HISTORY,
            steamID,
        );

        return data
            .chain((value) =>
                value === INVALID_TOKEN
                    ? left(
                          new ForbiddenException({
                              message: INVALID_TOKEN,
                              value: `Idle service: ${token}`,
                          }),
                      )
                    : right(value),
            )
            .map((value) =>
                this.isFailedResponse(value)
                    ? ({ ResultCode: 1, Items: [] } as IPunishmentList)
                    : value,
            )
            .map(punishmentHistoryTransformator);
    }
}
