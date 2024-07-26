import { Module } from '@nestjs/common';

import { IdleService } from './Idle.service';

@Module({
    providers: [IdleService],
    exports: [IdleService],
})
export class IdleIntegrationModule {}
