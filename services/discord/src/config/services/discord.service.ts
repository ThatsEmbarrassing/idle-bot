import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { IntentsBitField } from 'discord.js';

import type { DiscordModuleOption, DiscordOptionsFactory } from '@discord-nestjs/core';

@Injectable()
export class DiscordConfigService implements DiscordOptionsFactory {
    constructor(@Inject(ConfigService) private readonly configService: ConfigService) {}

    createDiscordOptions(): DiscordModuleOption {
        return {
            token: this.configService.get('BOT_TOKEN')!,
            discordClientOptions: {
                intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages],
            },
            registerCommandOptions: [
                {
                    forGuild: this.configService.get('DEV_GUILD_DISCORD_ID'),
                },
            ],
        };
    }
}
