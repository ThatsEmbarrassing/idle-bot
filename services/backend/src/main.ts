import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

import cookieParser from 'cookie-parser';

import '@prisma/client';

import { AppModule } from './app.module';

import type { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
    // #=============================================
    // #Initial configuration

    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    // RabbitMQ
    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.RMQ,
        options: {
            urls: [configService.get<string>('RABBITMQ_URL')!],
            queue: configService.get<string>('RABBITMQ_QUEUE')!,
        },
    });

    // #Initial configuration
    // #=============================================

    // #=============================================
    // #Cookies

    const COOKIE_SECRET = configService.get<string>('BACKEND_COOKIES_SECRET');
    app.use(cookieParser(COOKIE_SECRET));

    // #Cookies
    // #=============================================

    await app.listen(process.env.BACKEND_PORT!);
}

bootstrap();
