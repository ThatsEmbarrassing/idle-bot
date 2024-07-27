import { Module, Logger as LoggerService } from '@nestjs/common';

import { DiscordModule } from '@discord-nestjs/core';

import { HelpCommand } from './help.command';

@Module({
    imports: [DiscordModule.forFeature()],
    providers: [HelpCommand, LoggerService],
})
export class HelpCommandModule {}
