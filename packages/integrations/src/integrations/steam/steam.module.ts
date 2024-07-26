import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import { SteamService } from './steam.service';

@Module({
    imports: [ConfigModule],
    providers: [SteamService],
    exports: [SteamService],
})
export class SteamIntegrationModule {}
