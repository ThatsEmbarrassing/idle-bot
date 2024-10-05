import { BadRequestException, createParamDecorator } from '@nestjs/common';

import type { ExecutionContext } from '@nestjs/common';

import type { Request } from 'express';

type UserableRequest = Request & Record<'user', unknown>;

export const GetCurrentUser = createParamDecorator((param: string, context: ExecutionContext) => {
    const { user } = context.switchToHttp().getRequest<UserableRequest>();

    if (!user) {
        throw new BadRequestException("Can't find the `user` find in the Request object");
    }

    return param ? user[param] : user;
});
