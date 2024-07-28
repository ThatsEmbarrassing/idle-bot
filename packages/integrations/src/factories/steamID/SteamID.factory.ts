import { Injectable } from '@nestjs/common';

import { StaticSteamIDFactoryStrategy } from './StaticSteamIDFactoryStrategy';
import { UrlSteamIDFactoryStrategy } from './UrlSteamIDFactoryStrategy';

import type { ISteamIDFactory } from './types';

@Injectable()
export class SteamIDFactory implements ISteamIDFactory {
    private readonly baseProfileURl = 'https://steamcommunity.com/id/';

    private isProfileUrl(input: string) {
        return input.startsWith(this.baseProfileURl);
    }

    private getVanityFromUrl(input: string) {
        return input.replace(this.baseProfileURl, '');
    }

    constructor(
        private readonly staticSteamIDFactoryStrategy: StaticSteamIDFactoryStrategy,
        private readonly urlSteamIDFactoryStrategy: UrlSteamIDFactoryStrategy,
    ) {}

    async fromInput(input: string) {
        if (!this.isProfileUrl(input)) return this.staticSteamIDFactoryStrategy.fromInput(input);

        const vanity = this.getVanityFromUrl(input);

        return this.urlSteamIDFactoryStrategy.fromInput(vanity);
    }
}
