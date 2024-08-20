import { Param, ParamType } from '@discord-nestjs/core';

export class PunishmentDto {
    @Param({
        name: 'steamid',
        description: 'Стим айди игрока',
        required: true,
        type: ParamType.STRING,
    })
    public steamID: string;

    @Param({
        name: 'details',
        description: 'Показать подробную историю наказаний',
        type: ParamType.BOOLEAN,
    })
    public details = false;
}
