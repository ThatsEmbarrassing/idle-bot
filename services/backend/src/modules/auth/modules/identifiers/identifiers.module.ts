import { Module } from '@nestjs/common';

import { IdentifiersController } from './identifiers.controller';
import { IdentifiersService } from './identifiers.service';

@Module({
    controllers: [IdentifiersController],
    providers: [IdentifiersService],
})
export class IdentifierModule {}
