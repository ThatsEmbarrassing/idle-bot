import { Module } from '@nestjs/common';

import { ConfigService, ConfigModule } from '@nestjs/config';

import { DiscordModule } from '@discord-nestjs/core';

import { IntegrationModule } from '@idle-discord-bot/integrations';

import { ProfileCommandModule, HistoryCommandModule, HelpCommandModule } from './commands';

import { DiscordConfigService, IntegrationConfigService } from './config';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        DiscordModule.forRootAsync({
            inject: [ConfigService],
            imports: [ConfigModule],
            useClass: DiscordConfigService,
        }),
        IntegrationModule.forModuleRootAsync({
            inject: [ConfigService],
            imports: [ConfigModule],
            useClass: IntegrationConfigService,
        }),
        ProfileCommandModule,
        HistoryCommandModule,
        HelpCommandModule,
    ],
})
export class DiscordBotModule {}
