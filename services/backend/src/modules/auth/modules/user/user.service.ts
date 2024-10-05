import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { ProvidersEnum } from '../../definitions';

import type { IdentifiersPayloadDto } from '../../definitions';

interface IUserPayload extends Omit<IdentifiersPayloadDto, 'externalData'> {}

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    private getProviderDatabaseKeys(provider: ProvidersEnum) {
        const userKey = `${provider.toLowerCase()}User` as `${Lowercase<ProvidersEnum>}User`;
        const SIDKey = `${provider.toLowerCase()}SID` as `${Lowercase<ProvidersEnum>}SID`;

        return { userKey, SIDKey };
    }

    /**
     * Creates new record in the `User` table if it's not exist. Otherwise doesn't update the data.
     *
     * @param steamID - The authorized user's steam64 ID
     * @returns
     */
    private async upsertUser(steamID: string) {
        const { id: sid } = await this.prisma.user.upsert({
            where: { steamID },
            create: { steamID },
            update: {},
        });

        return { sid, steamID };
    }

    private async setUserProviderID(steamID: string, payload: IUserPayload) {
        const { provider, userProviderID: userID } = payload;
        const { userKey, SIDKey } = this.getProviderDatabaseKeys(provider);

        const { id: sid } = await this.prisma[userKey].create({
            data: { userID },
        });

        await this.prisma.user.update({
            where: { steamID },
            data: { [SIDKey]: sid },
        });
    }

    /**
     * Gets the service payload by user identifier
     *
     * @param identifier the user's identifier from the database
     * @returns service payload
     */
    private async getPayload(identifier: string) {
        const payload = await this.prisma.userIdentifier.findUnique({
            where: { id: identifier },
        });

        if (!payload) throw new UnauthorizedException();

        const { provider, providerID, userProviderID, externalData } = payload;

        return { provider, providerID, userProviderID, externalData };
    }

    /**
     * Entirely deletes the identifier and its payload
     */
    private async deleteIdentifier(identifier: string) {
        await this.prisma.userIdentifier.delete({
            where: { id: identifier },
        });
    }

    /**
     * Creates new record in the `User` table with the steamID if it hasn't created yet
     * whether this steamID has already been in the database or not.
     *
     * @param steamID - The authorized user's steam64 ID.
     */
    async authorize(steamID: string, identifier: string) {
        const [user, payload] = await Promise.all([
            this.upsertUser(steamID),
            this.getPayload(identifier),
        ]);
        const provider = ProvidersEnum[payload.provider];
        const userData = { ...user, ...payload };

        await this.setUserProviderID(steamID, { ...payload, provider });
        await this.deleteIdentifier(identifier);

        return userData;
    }
}
