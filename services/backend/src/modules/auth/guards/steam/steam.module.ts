import { Module } from '@nestjs/common';

import { SteamAuthStrategy } from './steam.strategy';

@Module({ providers: [SteamAuthStrategy], exports: [SteamAuthStrategy] })
export class SteamAuthModule {}
