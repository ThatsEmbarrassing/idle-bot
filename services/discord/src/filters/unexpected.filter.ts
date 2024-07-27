import { Catch, Logger as LoggerService } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

import { EmbedBuilder } from 'discord.js';

import type { ExceptionFilter } from '@nestjs/common';

import type { InteractionReplyOptions } from 'discord.js';

@Catch()
export class UnexpectedFilterException implements ExceptionFilter {
    constructor(
        private readonly configService: ConfigService,
        private readonly loggerService: LoggerService,
    ) {}

    private createEmbed(discordOwnerID: string) {
        const errorDescription = `Неизвестная ошибка, которую я не могу обработать. Сообщи об этом <@${discordOwnerID}>!`;

        return new EmbedBuilder()
            .setTitle('Неизвестная ошибка!')
            .setColor('Red')
            .setDescription(errorDescription);
    }

    catch(exception: Error): InteractionReplyOptions {
        const embed = this.createEmbed(this.configService.get('DISCORD_OWNER_ID')!);

        this.loggerService.error(
            `Unexpected exception: ${exception?.message ?? exception}`,
            //! There should be the provider's name instead of this exception's one in the future
            'UnexpectedFilterException',
        );

        return {
            embeds: [embed],
        };
    }
}
