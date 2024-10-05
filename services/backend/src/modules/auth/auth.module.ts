import { Module } from '@nestjs/common';

import { UserModule, IdentifierModule } from './modules';
import { SteamAuthModule } from './guards';

@Module({
    imports: [UserModule, IdentifierModule, SteamAuthModule],
})
export class AuthModule {}
