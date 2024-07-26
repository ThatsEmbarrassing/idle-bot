import { Choice, Param, ParamType } from '@discord-nestjs/core';

import { CommandsEnum } from '../enum';

export class HelpDto {
    @Choice(CommandsEnum)
    @Param({
        name: 'command',
        description: 'Название комманды',
        type: ParamType.STRING,
    })
    public command: CommandsEnum = CommandsEnum.help;
}
