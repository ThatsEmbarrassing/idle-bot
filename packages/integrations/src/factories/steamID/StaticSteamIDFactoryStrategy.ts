import { Injectable } from '@nestjs/common';

import { ID as SteamID } from '@node-steam/id';

import { BadSteamIDFormatError } from './errors';

import type { ISteamIDFactory } from './types';

@Injectable()
export class StaticSteamIDFactoryStrategy implements ISteamIDFactory {
    fromInput(input: string) {
        try {
            return new SteamID(input);
        } catch (e) {
            throw new BadSteamIDFormatError(input, { cause: e });
        }
    }
}
