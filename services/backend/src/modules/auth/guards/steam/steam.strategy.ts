import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from '@fabiansharp/modern-passport-steam';

import type { Request } from 'express';

import type { SteamStrategyOptions, SteamUser } from '@fabiansharp/modern-passport-steam';

@Injectable()
export class SteamAuthStrategy extends PassportStrategy(Strategy) {
    private static createOptions(
        configService: ConfigService,
    ): Omit<SteamStrategyOptions, 'apiKey'> {
        const baseURL = configService.get<string>('BACKEND_BASE_URL')!;
        const port = configService.get<string>('BACKEND_PORT')!;

        const realm = `${baseURL}:${port}`;
        const returnUrl = `${realm}/auth/user/return`;

        const options: Omit<SteamStrategyOptions, 'apiKey'> = {
            realm,
            returnUrl,
            fetchUserProfile: false,
            fetchSteamLevel: false,
            passReqToCallback: true,
        };

        return options;
    }

    constructor(configService: ConfigService) {
        super(SteamAuthStrategy.createOptions(configService));
    }

    validate(req: Request, user: SteamUser, done: (error: any, user?: any, info?: any) => void) {
        req.user = user;
        done(null, user);
    }
}
