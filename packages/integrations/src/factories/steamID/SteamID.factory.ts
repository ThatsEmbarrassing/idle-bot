import { Injectable } from '@nestjs/common';

import { StaticSteamIDFactoryStrategy } from './StaticSteamIDFactoryStrategy';
import { UrlSteamIDFactoryStrategy } from './UrlSteamIDFactoryStrategy';

import type { ISteamIDFactory } from './types';

@Injectable()
export class SteamIDFactory implements ISteamIDFactory {
    private readonly baseProfileURls = [
        'https://steamcommunity.com/id/',
        'https://steamcommunity.com/profiles/',
    ];

    private isProfileUrl(input: string) {
        return this.baseProfileURls.some((url) => input.startsWith(url));
    }

    private getVanityFromUrl(input: string) {
        return this.baseProfileURls
            .reduce((acc, url) => acc.replace(url, ''), input)
            .replace('/', '');
    }

    constructor(
        private readonly staticSteamIDFactoryStrategy: StaticSteamIDFactoryStrategy,
        private readonly urlSteamIDFactoryStrategy: UrlSteamIDFactoryStrategy,
    ) {}

    async fromInput(input: string) {
        if (!this.isProfileUrl(input)) return this.staticSteamIDFactoryStrategy.fromInput(input);

        const vanity = this.getVanityFromUrl(input);

        try {
            return this.staticSteamIDFactoryStrategy.fromInput(vanity);
        } catch {
            return this.urlSteamIDFactoryStrategy.fromInput(vanity);
        }
    }
}
