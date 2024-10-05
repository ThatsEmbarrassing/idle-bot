import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { IdentifiersPayloadDto } from '../../definitions';

@Injectable()
export class IdentifiersService {
    constructor(private readonly prisma: PrismaService) {}

    async createIdentifier(payload: IdentifiersPayloadDto) {
        const { provider, providerID, userProviderID, externalData } = payload;
        const data = {
            provider,
            providerID,
            userProviderID,
            externalData,
        };

        const { id: identifier } = await this.prisma.userIdentifier.create({ data });

        return { identifier };
    }
}
