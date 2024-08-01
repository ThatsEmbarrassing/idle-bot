import { Test } from '@nestjs/testing';

import * as NodeSteamID from '@node-steam/id';

import { SteamService } from '@/integrations';

import { STEAM_API_OPTIONS } from '@/constants';

import { SteamIDFactory } from './SteamID.factory';
import { StaticSteamIDFactoryStrategy } from './StaticSteamIDFactoryStrategy';
import { UrlSteamIDFactoryStrategy } from './UrlSteamIDFactoryStrategy';

import type { SteamAPIOptions } from '@/types';
import { BadSteamIDFormatError } from './errors';

const steamApiOptions: SteamAPIOptions = {
    token: '__steam_id_factory_test_steam_api_token__',
};

describe('SteamIDFactory', () => {
    let steamIDFactory: SteamIDFactory;

    const steamIDValue = '__steam_id_factory_test_steam_id_value__';
    const staticSteamIDValue = '__steam_id_factory_test_static_steam_id_value__';
    const dynamicSteamIDValue = '__steam_id_factory_test_dynamic_steam_id_value__';

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                { provide: STEAM_API_OPTIONS, useValue: steamApiOptions },
                StaticSteamIDFactoryStrategy,
                UrlSteamIDFactoryStrategy,
                SteamIDFactory,
                SteamService,
            ],
        }).compile();

        steamIDFactory = moduleRef.get(SteamIDFactory);
    });

    beforeEach(() => {
        jest.spyOn(NodeSteamID, 'ID').mockImplementation(
            (input) =>
                ({
                    toString: () => input,
                }) as NodeSteamID.ID,
        );

        jest.spyOn(StaticSteamIDFactoryStrategy.prototype, 'fromInput').mockReturnValue(
            new NodeSteamID.ID(staticSteamIDValue),
        );

        jest.spyOn(UrlSteamIDFactoryStrategy.prototype, 'fromInput').mockResolvedValue(
            new NodeSteamID.ID(dynamicSteamIDValue),
        );
    });

    it('should use the static strategy if the passed value is not valid steam URL', async () => {
        const instance = await steamIDFactory.fromInput(steamIDValue);
        expect(instance.toString()).toBe(staticSteamIDValue);
    });

    it('should use the static strategy if the vanity from passed url satisfies steamID format', async () => {
        const profilesLink = 'https://steamcommunity.com/profiles/';
        const idLink = 'https://steamcommunity.com/id/';

        const profilesInstance = await steamIDFactory.fromInput(`${profilesLink}${steamIDValue}`);
        const idInstance = await steamIDFactory.fromInput(`${idLink}${steamIDValue}`);

        expect(profilesInstance.toString()).toBe(staticSteamIDValue);
        expect(idInstance.toString()).toBe(staticSteamIDValue);
    });

    it("should use the URL strategy if the vanity from passed url doesn't satisfy steamID format", async () => {
        jest.spyOn(StaticSteamIDFactoryStrategy.prototype, 'fromInput').mockImplementation(
            (input) => {
                throw new BadSteamIDFormatError(input);
            },
        );

        const profilesLink = 'https://steamcommunity.com/profiles/';

        const profilesInstance = await steamIDFactory.fromInput(`${profilesLink}${steamIDValue}`);

        expect(profilesInstance.toString()).toBe(dynamicSteamIDValue);
    });
});
