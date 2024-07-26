import { Command, Handler, IA } from '@discord-nestjs/core';
import { SlashCommandPipe } from '@discord-nestjs/common';

import { EmbedBuilder } from 'discord.js';

import { HelpDto } from './dto';

import { CommandsEnum } from './enum';

import { commandsConfig } from './config';

import type { InteractionReplyOptions } from 'discord.js';

import type { ICommandConfig } from './types';

@Command({
    name: 'help',
    description: 'Помощь по командам',
})
export class HelpCommand {
    private createParamsDescriptions(params: Record<string, string>): string {
        return Object.entries(params)
            .map((value) => value.join(' - '))
            .join('\n');
    }

    private createEmbed(command: CommandsEnum, commandConfig: ICommandConfig) {
        const { description, structure, params = {} } = commandConfig;

        return new EmbedBuilder()
            .setTitle(`Справка по команде ${command}`)
            .setDescription(description)
            .setColor('Blue')
            .setFields(
                {
                    name: 'Структура',
                    value: `\`${structure}\``,
                },
                { name: 'Параметры', value: this.createParamsDescriptions(params) },
            );
    }

    @Handler()
    onHelp(@IA(SlashCommandPipe) dto: HelpDto): InteractionReplyOptions {
        const { command } = dto;

        const embed = this.createEmbed(command, commandsConfig[command]);

        return {
            embeds: [embed],
        };
    }
}
