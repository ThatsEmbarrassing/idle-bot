import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import type { ModuleConfigFactory } from '@golevelup/nestjs-modules';

import type { IntegrationsAPIOptions } from '@idle-discord-bot/integrations';

@Injectable()
export class IntegrationConfigService implements ModuleConfigFactory<IntegrationsAPIOptions> {
    constructor(@Inject(ConfigService) private readonly configService: ConfigService) {}

    createModuleConfig(): IntegrationsAPIOptions {
        return {
            idleAPIToken: this.configService.get('IDLE_API_TOKEN')!,
            idleAPIUrl: this.configService.get('IDLE_API_URL')!,
            steamAPIToken: this.configService.get('STEAM_API_TOKEN')!,
        };
    }
}
