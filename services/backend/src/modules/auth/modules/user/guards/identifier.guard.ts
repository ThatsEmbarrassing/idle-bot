import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'nestjs-prisma';

import timestring from 'timestring';

import type { CanActivate, ExecutionContext } from '@nestjs/common';

import type { Request, Response } from 'express';
import type { ParamsDictionary } from 'express-serve-static-core';

import type { IUserQuery } from './types';

type GuardRequest = Request<ParamsDictionary, any, any, Partial<IUserQuery>>;

@Injectable()
export class IdentifierGuard implements CanActivate {
    constructor(
        private readonly configService: ConfigService,
        private readonly prisma: PrismaService,
    ) {}

    private async isExistingIdentifier(identifier: string): Promise<boolean> {
        const matchedUser = await this.prisma.userIdentifier.findUnique({
            where: { id: identifier },
        });

        return !!matchedUser;
    }

    private isValidIdentifier(identifier: unknown): identifier is string {
        return !!identifier && typeof identifier === 'string';
    }

    private getIdentifier(request: Request) {
        const { query } = request;
        const { identifier } = query;

        if (!this.isValidIdentifier(identifier)) throw new UnauthorizedException();

        return identifier;
    }

    private setCookie(response: Response, identifier: string) {
        const COOKIE_EXPIRES_IN = this.configService.get<string>('BACKEND_COOKIES_EXPIRES_IN')!;

        response.cookie('idle-bot__identifier', identifier, {
            sameSite: false,
            signed: true,
            httpOnly: true,
            path: '/',
            maxAge: timestring(COOKIE_EXPIRES_IN, 'milliseconds'),
        });
    }

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest<GuardRequest>();
        const response = context.switchToHttp().getResponse<Response>();

        const identifier = this.getIdentifier(request);

        const isExistingIdentifier = await this.isExistingIdentifier(identifier);

        if (!isExistingIdentifier) throw new UnauthorizedException();

        this.setCookie(response, identifier);

        return true;
    }
}
