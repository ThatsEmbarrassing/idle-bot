import type { ID as SteamID } from '@node-steam/id';

export interface ISteamIDFactory {
    fromInput(input: string): SteamID | Promise<SteamID>;
}
