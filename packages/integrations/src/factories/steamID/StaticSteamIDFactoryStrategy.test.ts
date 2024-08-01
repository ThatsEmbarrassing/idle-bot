import { Test } from '@nestjs/testing';

import * as NodeSteamID from '@node-steam/id';

import { BadSteamIDFormatError } from './errors';

import { StaticSteamIDFactoryStrategy } from './StaticSteamIDFactoryStrategy';

describe('StaticSteamIDFactoryStrategy', () => {
    let staticSteamIDFactoryStrategy: StaticSteamIDFactoryStrategy;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [StaticSteamIDFactoryStrategy],
        }).compile();

        staticSteamIDFactoryStrategy = moduleRef.get(StaticSteamIDFactoryStrategy);
    });

    beforeEach(() => {
        jest.spyOn(NodeSteamID, 'ID').mockClear();
    });

    it('should return SteamID mocked instance', () => {
        jest.spyOn(NodeSteamID, 'ID').mockImplementation(
            (input) =>
                ({
                    toString: () => input,
                }) as NodeSteamID.ID,
        );

        const value = '__static_steam_id_factory_strategy_test_input__';

        const instance = staticSteamIDFactoryStrategy.fromInput(value);

        expect(instance.toString()).toBe(value);
    });

    it('should throw BadSteamIDFormat if the format is incorrect', () => {
        jest.spyOn(NodeSteamID, 'ID').mockImplementation((input) => new NodeSteamID.ID(input));

        const value = '__static_steam_id_factory_strategy_test_input__';

        expect(() => staticSteamIDFactoryStrategy.fromInput(value)).toThrow(BadSteamIDFormatError);
    });
});
