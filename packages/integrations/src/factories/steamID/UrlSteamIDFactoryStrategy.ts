import { Injectable } from '@nestjs/common';

import { ID as SteamID } from '@node-steam/id';

import { SteamService } from '../../integrations';

import type { Either } from 'purify-ts';

import type { ISteamIDFactory } from './types';

@Injectable()
export class UrlSteamIDFactoryStrategy implements ISteamIDFactory {
    private safeExtract<L, R>(either: Either<L, R>): Exclude<L | R, Error> {
        const value = either.extract();

        if (value instanceof Error) throw value;

        return value as Exclude<L | R, Error>;
    }

    private async getSteamIDFromVanity(vanity: string) {
        return this.safeExtract(await this.steamService.resolveURL(vanity)).steamid;
    }

    constructor(private readonly steamService: SteamService) {}

    async fromInput(vanity: string) {
        const steamID = await this.getSteamIDFromVanity(vanity);

        return new SteamID(steamID);
    }
}
