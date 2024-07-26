import { Catch, ForbiddenException, Logger } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

import { EmbedBuilder } from 'discord.js';

import type { ExceptionFilter } from '@nestjs/common';

import type { InteractionReplyOptions } from 'discord.js';

@Catch(ForbiddenException)
export class ForbiddenFilterException implements ExceptionFilter<ForbiddenException> {
    private readonly configService: ConfigService;
    private readonly logger: Logger;

    constructor() {
        this.logger = new Logger('ProfileCommand');
        this.configService = new ConfigService();
    }

    catch(exception: ForbiddenException): InteractionReplyOptions {
        const DISCORD_OWNER_ID = this.configService.get('DISCORD_OWNER_ID');

        const embed = new EmbedBuilder()
            .setTitle('Ошибка доступа')
            .setColor('Red')
            .setDescription(
                `Невозможно получить данные с сервера. Сообщи об этом <@${DISCORD_OWNER_ID}>`,
            );

        const { message, value, env } = exception.getResponse() as Record<
            'message' | 'value' | 'env',
            string
        >;

        this.logger.error(`${exception.name}: ${message} ( ${env}=${value} )`);

        return {
            embeds: [embed],
        };
    }
}
