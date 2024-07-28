import { Param, ParamType } from '@discord-nestjs/core';

export class ProfileDto {
    @Param({
        name: 'steamid',
        description: 'Стим айди игрока',
        required: true,
        type: ParamType.STRING,
    })
    public steamID: string = null as unknown as string;
}
