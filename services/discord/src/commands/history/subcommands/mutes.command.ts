import { UseFilters } from '@nestjs/common';

import { Handler, IA, SubCommand } from '@discord-nestjs/core';
import { SlashCommandPipe } from '@discord-nestjs/common';

import { EmbedBuilder } from 'discord.js';

import { ProfileFactory } from '@idle-discord-bot/integrations';

import { formatPunishment } from '@idle-discord-bot/shared';

import { ForbiddenFilterException, NotFoundFilterException } from '../../../filters';

import { PunishmentLogsFactory } from '../factories';

import { PunishmentDto } from '../dto';

import type { CommandInteraction } from 'discord.js';

import type { ICombinedProfile } from '@idle-discord-bot/integrations';

@UseFilters(ForbiddenFilterException, NotFoundFilterException)
@SubCommand({ name: 'mutes', description: 'История мутов игрока' })
export class MutesHistoryCommand {
    private createEmbed(profile: ICombinedProfile) {
        const {
            nickname,
            avatar,
            profileurl,
            punishments: {
                mutes: {
                    current,
                    history: { length },
                },
            },
        } = profile;

        return new EmbedBuilder()
            .setColor('Green')
            .setURL(profileurl)
            .setImage(avatar)
            .setTitle(`Информация о мутах игрока ${nickname}`)
            .setFields(
                {
                    name: 'Количество мутов',
                    value: length.toString(),
                    inline: true,
                },
                {
                    name: 'Статус мута',
                    value: formatPunishment(current, 'Отсутствует'),
                    inline: true,
                },
            );
    }

    constructor(
        private readonly profileFactory: ProfileFactory,
        private readonly punishmentLogsFactory: PunishmentLogsFactory,
    ) {}

    @Handler()
    async onBansHistory(
        @IA() interaction: CommandInteraction,
        @IA(SlashCommandPipe) dto: PunishmentDto,
    ) {
        const { details, steamID } = dto;

        const profile = await this.profileFactory.getProfile(steamID);
        const embed = this.createEmbed(profile);

        await interaction.reply({
            embeds: [embed],
        });

        if (!details) return;

        const { items } = profile.punishments.mutes.history;

        items
            .map((item, index) => `${index + 1}. ${formatPunishment(item)}`)
            .reduce(this.punishmentLogsFactory.createLogsMessages, [[]])
            .map((value) => value.join('\n'))
            .map((value) => `>>> ${value}`)
            .forEach(
                async (value) => await interaction.followUp({ content: value, ephemeral: true }),
            );
    }
}
