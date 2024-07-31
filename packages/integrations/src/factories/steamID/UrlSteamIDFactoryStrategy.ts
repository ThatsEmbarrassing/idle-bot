import { Injectable } from '@nestjs/common';

import { SteamService } from '@integrations/steam';

import { safeExtract } from '@idle-discord-bot/utils';

import { StaticSteamIDFactoryStrategy } from './StaticSteamIDFactoryStrategy';

import type { ISteamIDFactory } from './types';

@Injectable()
export class UrlSteamIDFactoryStrategy implements ISteamIDFactory {
    private async getSteamIDFromVanity(vanity: string) {
        return safeExtract(await this.steamService.resolveURL(vanity)).steamid;
    }

    constructor(
        private readonly steamService: SteamService,
        private readonly staticSteamIDFactoryStrategy: StaticSteamIDFactoryStrategy,
    ) {}

    async fromInput(vanity: string) {
        const steamID = await this.getSteamIDFromVanity(vanity);

        return this.staticSteamIDFactoryStrategy.fromInput(steamID);
    }
}
