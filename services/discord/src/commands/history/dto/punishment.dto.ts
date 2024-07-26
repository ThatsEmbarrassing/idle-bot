import { Param, ParamType } from '@discord-nestjs/core';

import { Transform } from 'class-transformer';

import { ID as SteamID } from '@node-steam/id';

export class PunishmentDto {
    @Param({
        name: 'steamid',
        description: 'Стим айди игрока',
        required: true,
        type: ParamType.STRING,
    })
    @Transform(({ value }) => new SteamID(value))
    public steamID: SteamID = null as unknown as SteamID;

    @Param({
        name: 'details',
        description: 'Показать подробную историю наказаний',
        type: ParamType.BOOLEAN,
    })
    public details = false;
}
