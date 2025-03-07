import { Module, Logger as LoggerService } from '@nestjs/common';

import { DiscordModule } from '@discord-nestjs/core';

import { IntegrationModule } from '@idle-discord-bot/integrations';

import { ProfileCommand } from './profile.command';

@Module({
    imports: [DiscordModule.forFeature(), IntegrationModule.forFeature()],
    providers: [ProfileCommand, LoggerService],
})
export class ProfileCommandModule {}
