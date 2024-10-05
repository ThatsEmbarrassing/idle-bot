import { createParamDecorator } from '@nestjs/common';

import type { ExecutionContext } from '@nestjs/common';

import type { Request } from 'express';

interface CookiesOptions {
    param: string;
    signed: boolean;
}

export const Cookies = createParamDecorator(
    (options: Partial<CookiesOptions>, context: ExecutionContext) => {
        const { param, signed = false } = options;
        const { cookies: unsignedCookies, signedCookies } = context
            .switchToHttp()
            .getRequest<Request>();

        const cookies = signed ? signedCookies : unsignedCookies;

        return param ? cookies[param] : cookies;
    },
);
