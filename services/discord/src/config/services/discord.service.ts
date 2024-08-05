import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { IntentsBitField } from 'discord.js';

import type { DiscordModuleOption, DiscordOptionsFactory } from '@discord-nestjs/core';

@Injectable()
export class DiscordConfigService implements DiscordOptionsFactory {
    private isDev(): boolean {
        return this.configService.get('ENV_MODE') === 'development';
    }

    constructor(@Inject(ConfigService) private readonly configService: ConfigService) {}

    createDiscordOptions(): DiscordModuleOption {
        const commonOptions: DiscordModuleOption = {
            token: this.configService.get('BOT_TOKEN')!,
            discordClientOptions: {
                intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages],
            },
        };

        const productionOptions: DiscordModuleOption = {
            ...commonOptions,
        };

        const devOptions: DiscordModuleOption = {
            ...commonOptions,
            registerCommandOptions: [
                {
                    forGuild: this.configService.get('DEV_GUILD_DISCORD_ID'),
                    removeCommandsBefore: true,
                },
            ],
        };

        return this.isDev() ? devOptions : productionOptions;
    }
}
