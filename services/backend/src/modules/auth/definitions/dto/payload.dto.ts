import { IsEnum, IsNotEmpty, IsNumberString, IsObject } from 'class-validator';

import { ProvidersEnum } from '..';

export class IdentifiersPayloadDto {
    @IsNotEmpty()
    @IsEnum(ProvidersEnum)
    provider: ProvidersEnum;

    @IsNotEmpty()
    @IsNumberString()
    providerID: string;

    @IsNotEmpty()
    @IsNumberString()
    userProviderID: string;

    @IsObject()
    externalData?: object;
}
