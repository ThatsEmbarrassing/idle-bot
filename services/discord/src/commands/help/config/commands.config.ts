import { CommandsEnum } from '../enum';

import type { ICommandConfig } from '../types';

export const commandsConfig: Record<string, ICommandConfig> = {
    [CommandsEnum.help]: {
        structure: '/help [command]',
        description: 'Помощь по командам',
        params: {
            command: 'Название команды. По умолчанию `help`',
        },
    },
    [CommandsEnum.mutesHistory]: {
        structure: '/history mutes <steamid> [details]',
        description: 'Информация о мутах игрока',
        params: {
            steamid: 'Стим айди игрока.',
            details: 'Подробная история всех мутов игрока. По умолчанию `false`',
        },
    },
    [CommandsEnum.bansHistory]: {
        structure: '/history bans <steamid> [details]',
        description: 'Информация о банах игрока',
        params: {
            steamid: 'Стим айди игрока.',
            details: 'Подробная история всех банов игрока. По умолчанию `false`',
        },
    },
    [CommandsEnum.profile]: {
        structure: '/profile <steamid>',
        description: 'Основная информация об игроке',
        params: {
            steamid: 'Стим айди игрока.',
        },
    },
};
