import { Controller, Get, HttpCode, HttpStatus, UseGuards, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { SteamAuthGuard } from '../../guards';

import { Cookies, GetCurrentUser } from '../../decorators';

import { IdentifierGuard } from './guards';

import { UserService } from './user.service';

import type { SteamUser } from '@fabiansharp/modern-passport-steam';

@Controller('auth/user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        @Inject('USERS_QUEUE_SERVICE') private readonly clientProxy: ClientProxy,
    ) {}

    @Get('')
    @HttpCode(HttpStatus.FOUND)
    @UseGuards(IdentifierGuard, SteamAuthGuard)
    index() {}

    @Get('return')
    @UseGuards(SteamAuthGuard)
    async authorize(
        @GetCurrentUser() steamID: SteamUser['SteamID'],
        @Cookies({ param: 'idle-bot__identifier', signed: true }) identifier: string,
    ) {
        const { provider, ...rest } = await this.userService.authorize(
            steamID.getSteamID64(),
            identifier,
        );

        this.clientProxy.emit({ event: 'user-authorized', provider }, { provider, ...rest });
    }
}
