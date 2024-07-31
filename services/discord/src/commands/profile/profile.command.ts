import { Injectable, UseFilters } from '@nestjs/common';

import { Command, Handler, IA } from '@discord-nestjs/core';
import { SlashCommandPipe } from '@discord-nestjs/common';

import { EmbedBuilder } from 'discord.js';

import { ProfileFactory, SteamIDFactory } from '@idle-discord-bot/integrations';

import { formatPunishment } from '@idle-discord-bot/shared';

import { ProfileDto } from './dto';

import {
    BadFormatFilterException,
    ForbiddenFilterException,
    NotFoundFilterException,
    UnexpectedFilterException,
} from '@/filters';

import { formatRank, formatVACBan, formatVip } from './formatters';

import type { InteractionReplyOptions } from 'discord.js';

import type { ICombinedProfile } from '@idle-discord-bot/integrations';

const filters = [
    UnexpectedFilterException,
    ForbiddenFilterException,
    NotFoundFilterException,
    BadFormatFilterException,
];

@UseFilters(...filters)
@Command({
    name: 'profile',
    description: 'Отображает информацию об игроке',
})
@Injectable()
export class ProfileCommand {
    constructor(
        private readonly profileFactory: ProfileFactory,
        private readonly steamIDFactory: SteamIDFactory,
    ) {}

    private createEmbed(profile: ICombinedProfile): EmbedBuilder {
        const { avatar, punishments, nickname, profileurl, rank, steamid, vac, vip } = profile;
        const { mutes, bans } = punishments;

        return new EmbedBuilder()
            .setTitle(nickname)
            .setColor('Green')
            .setURL(profileurl)
            .setImage(avatar)
            .setFields([
                {
                    name: 'Ник',
                    value: nickname,
                    inline: true,
                },
                {
                    name: 'SteamID',
                    value: steamid,
                    inline: true,
                },
                {
                    name: 'Вип',
                    value: formatVip(vip),
                    inline: true,
                },
                {
                    name: 'Ранг',
                    value: formatRank(rank),
                    inline: true,
                },
                {
                    name: '\t',
                    value: '\t',
                },
                {
                    name: 'Мут',
                    value: formatPunishment(mutes.current, 'Отсутствует'),
                    inline: true,
                },
                {
                    name: 'Бан',
                    value: formatPunishment(bans.current, 'Отсутствует'),
                    inline: true,
                },
                {
                    name: 'VAC-бан',
                    value: formatVACBan(vac),
                    inline: true,
                },
            ]);
    }

    @Handler()
    public async onProfile(
        @IA(SlashCommandPipe) dto: ProfileDto,
    ): Promise<InteractionReplyOptions> {
        const steamID = await this.steamIDFactory.fromInput(dto.steamID);

        const profile = await this.profileFactory.getProfile(steamID);

        const embed = this.createEmbed(profile);

        return {
            embeds: [embed],
        };
    }
}
