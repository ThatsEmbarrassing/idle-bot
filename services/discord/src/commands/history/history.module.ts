import { Module } from '@nestjs/common';

import { DiscordModule } from '@discord-nestjs/core';

import { IntegrationModule } from '@idle-discord-bot/integrations';

import { BansHistoryCommand, MutesHistoryCommand } from './subcommands';

import { PunishmentLogsFactory } from './factories';

import { HistoryCommand } from './history.command';

@Module({
    imports: [DiscordModule.forFeature(), IntegrationModule.forFeature()],
    providers: [PunishmentLogsFactory, BansHistoryCommand, MutesHistoryCommand, HistoryCommand],
})
export class HistoryCommandModule {}
