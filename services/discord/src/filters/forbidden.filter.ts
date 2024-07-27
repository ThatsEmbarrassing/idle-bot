import { Catch, ForbiddenException, Logger as LoggerService } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

import { EmbedBuilder } from 'discord.js';

import type { ExceptionFilter } from '@nestjs/common';

import type { InteractionReplyOptions } from 'discord.js';

@Catch(ForbiddenException)
export class ForbiddenFilterException implements ExceptionFilter<ForbiddenException> {
    constructor(
        private readonly loggerService: LoggerService,
        private readonly configService: ConfigService,
    ) {}

    catch(exception: ForbiddenException): InteractionReplyOptions {
        const DISCORD_OWNER_ID = this.configService.get('DISCORD_OWNER_ID');

        const embed = new EmbedBuilder()
            .setTitle('Ошибка доступа')
            .setColor('Red')
            .setDescription(
                `Невозможно получить данные с сервера. Сообщи об этом <@${DISCORD_OWNER_ID}>`,
            );

        // !TODO make an exception extends ForbiddenException and includes a provider's (or command's) name where the exception is thrown
        const { message, value, env } = exception.getResponse() as Record<
            'message' | 'value' | 'env',
            string
        >;

        this.loggerService.error(
            `${exception.name}: ${message} ( ${env}=${value} )`,
            //! There should be the provider's name instead of this exception's one in the future
            'ForbiddenFilterException',
        );

        return {
            embeds: [embed],
        };
    }
}
