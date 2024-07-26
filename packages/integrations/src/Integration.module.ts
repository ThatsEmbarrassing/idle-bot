import { Module } from '@nestjs/common';

import { createConfigurableDynamicRootModule } from '@golevelup/nestjs-modules';

import { IdleService, SteamService } from './integrations';

import { ProfileFactory } from './factories';

import { INTEGRATIONS_API_OPTIONS, IDLE_API_OPTIONS, STEAM_API_OPTIONS } from './constants';

import type { Provider } from '@nestjs/common';

import type { AsyncModuleConfig } from '@golevelup/nestjs-modules';

import type { IntegrationsAPIOptions, IdleAPIOptions, SteamAPIOptions } from './types';

const idleAPIOptionsProvider: Provider = {
    provide: IDLE_API_OPTIONS,
    inject: [INTEGRATIONS_API_OPTIONS],
    useFactory: ({
        idleAPIToken: token,
        idleAPIUrl: url,
    }: IntegrationsAPIOptions): IdleAPIOptions => ({ token, url }),
};

const steamAPIOptionsProvider: Provider = {
    provide: STEAM_API_OPTIONS,
    inject: [INTEGRATIONS_API_OPTIONS],
    useFactory: ({ steamAPIToken: token }: IntegrationsAPIOptions): SteamAPIOptions => ({
        token,
    }),
};

@Module({})
export class IntegrationModule extends createConfigurableDynamicRootModule<
    IntegrationModule,
    IntegrationsAPIOptions
>(INTEGRATIONS_API_OPTIONS, {
    providers: [
        idleAPIOptionsProvider,
        steamAPIOptionsProvider,
        IdleService,
        SteamService,
        ProfileFactory,
    ],
    exports: [ProfileFactory],
}) {
    static forModuleRoot = (options: IntegrationsAPIOptions) =>
        IntegrationModule.forRoot(IntegrationModule, options);

    static forModuleRootAsync = (options: AsyncModuleConfig<IntegrationsAPIOptions>) =>
        IntegrationModule.forRootAsync(IntegrationModule, options);

    static forFeature = () => IntegrationModule.externallyConfigured(IntegrationModule, 0);
}
