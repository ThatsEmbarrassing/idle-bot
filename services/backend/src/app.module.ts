import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PrismaModule } from 'nestjs-prisma';

import { AuthModule } from './modules';

@Module({
    imports: [
        AuthModule,
        ClientsModule.registerAsync({
            isGlobal: true,
            clients: [
                {
                    imports: [ConfigModule],
                    inject: [ConfigService],
                    name: 'USERS_QUEUE_SERVICE',
                    useFactory: (configService: ConfigService) => ({
                        transport: Transport.RMQ,
                        options: {
                            queue: configService.get<string>('RABBITMQ_QUEUE')!,
                            urls: [configService.get<string>('RABBITMQ_URL')!],
                        },
                    }),
                },
            ],
        }),
        ConfigModule.forRoot({ isGlobal: true }),
        PrismaModule.forRoot({ isGlobal: true }),
    ],
})
export class AppModule {}
