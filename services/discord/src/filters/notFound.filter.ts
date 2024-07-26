import { Catch, NotFoundException } from '@nestjs/common';

import { EmbedBuilder } from 'discord.js';

import type { InteractionReplyOptions } from 'discord.js';

import type { ExceptionFilter } from '@nestjs/common';

@Catch(NotFoundException)
export class NotFoundFilterException implements ExceptionFilter<NotFoundException> {
    catch(exception: NotFoundException): InteractionReplyOptions {
        const { message: steamID } = exception;

        const embed = new EmbedBuilder()
            .setTitle('Пользователь не найден')
            .setColor('Red')
            .setDescription(
                `Пользователь со стим айди \`${steamID}\` **не найден** либо **не существует**.`,
            );

        return { embeds: [embed] };
    }
}
