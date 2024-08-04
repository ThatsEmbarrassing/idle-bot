import { NestFactory } from '@nestjs/core';

import { DiscordBotModule } from './discordBot.module';

async function bootstrap() {
    await NestFactory.createApplicationContext(DiscordBotModule);
}
bootstrap();
