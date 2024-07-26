import { Param, ParamType } from '@discord-nestjs/core';

import { ID as SteamID } from '@node-steam/id';

import { Transform } from 'class-transformer';

export class ProfileDto {
    @Param({
        name: 'steamid',
        description: 'Стим айди игрока',
        required: true,
        type: ParamType.STRING,
    })
    @Transform(({ value }) => new SteamID(value))
    public steamID: SteamID = null as unknown as SteamID;
}
