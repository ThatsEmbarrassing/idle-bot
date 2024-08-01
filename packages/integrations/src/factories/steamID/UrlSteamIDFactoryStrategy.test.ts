import { Test } from '@nestjs/testing';

import { Either } from 'purify-ts/Either';

import * as NodeSteamID from '@node-steam/id';

import { SteamService } from '@/integrations';

import { STEAM_API_OPTIONS } from '@/constants';

import { UrlSteamIDFactoryStrategy } from './UrlSteamIDFactoryStrategy';
import { StaticSteamIDFactoryStrategy } from './StaticSteamIDFactoryStrategy';

import type { SteamAPIOptions } from '@/types';

const steamApiOptions: SteamAPIOptions = {
    token: '__url_steam_id_factory_strategy_test_steam_api_token__',
};

const steamIDValue = '__url_steam_id_factory_strategy_test_steam_id__';

describe('URLSteamIDFactoryStrategy', () => {
    let urlSteamIDFactoryStrategy: UrlSteamIDFactoryStrategy;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                { provide: STEAM_API_OPTIONS, useValue: steamApiOptions },
                StaticSteamIDFactoryStrategy,
                UrlSteamIDFactoryStrategy,
                SteamService,
            ],
        }).compile();

        urlSteamIDFactoryStrategy = moduleRef.get(UrlSteamIDFactoryStrategy);
    });

    beforeEach(() => {
        jest.spyOn(NodeSteamID, 'ID').mockImplementation(
            (input) =>
                ({
                    toString: () => input,
                }) as NodeSteamID.ID,
        );

        jest.spyOn(SteamService.prototype, 'resolveURL').mockResolvedValue(
            Either.of({ steamid: steamIDValue, success: 1 }),
        );

        jest.spyOn(StaticSteamIDFactoryStrategy.prototype, 'fromInput').mockReturnValue(
            new NodeSteamID.ID(steamIDValue),
        );
    });

    it('should return SteamID mocked instance', async () => {
        const instance = await urlSteamIDFactoryStrategy.fromInput(steamIDValue);

        expect(instance.toString()).toBe(steamIDValue);
    });
});
