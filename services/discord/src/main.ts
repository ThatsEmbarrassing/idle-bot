import { NestFactory } from '@nestjs/core';

import { config } from 'dotenv';

import { DiscordBotModule } from './discordBot.module';

async function bootstrap() {
    config({ path: '../../../.env' });

    await NestFactory.createApplicationContext(DiscordBotModule);
}
bootstrap();
