import { Command } from '@discord-nestjs/core';

import { BansHistoryCommand, MutesHistoryCommand } from './subcommands';

@Command({
    name: 'history',
    description: 'История наказаний игрока',
    include: [BansHistoryCommand, MutesHistoryCommand],
})
export class HistoryCommand {}
