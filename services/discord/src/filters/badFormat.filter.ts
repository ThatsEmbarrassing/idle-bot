import { Catch } from '@nestjs/common';

import { EmbedBuilder } from 'discord.js';

import { BadSteamIDFormatError } from '@idle-discord-bot/integrations';

import type { ExceptionFilter } from '@nestjs/common';

import type { InteractionReplyOptions } from 'discord.js';

@Catch(BadSteamIDFormatError)
export class BadFormatFilterException implements ExceptionFilter<BadSteamIDFormatError> {
    private createEmbed(steamID: string) {
        const description = `
Невалидный формат SteamID: ${steamID}.
Поддерживаемые форматы:
- steam id2( *STEAM_X:Y:Z* )
- steam id3( *[U:X:Y]* )
- steam64 ID( *17-значное число* )
- ссылки( *steamcommunity.com/id* и *steamcommunity.com/profiles* )`;

        return new EmbedBuilder()
            .setTitle('Невалидный формат')
            .setColor('Red')
            .setDescription(description);
    }

    catch(exception: BadSteamIDFormatError): InteractionReplyOptions {
        const { input: steamID } = exception;

        const embed = this.createEmbed(steamID);

        return {
            embeds: [embed],
        };
    }
}
