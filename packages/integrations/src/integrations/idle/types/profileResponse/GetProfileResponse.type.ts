import { INVALID_TOKEN } from '@/integrations/idle/constants';

import type { IFailedResponse as IFailedGetProfileResponse } from '../common';

import type { ISuccessfulGetProfileResponse } from './ISuccessfulGetProfileResponse.interface';

export type GetProfileResponse =
    | ISuccessfulGetProfileResponse
    | IFailedGetProfileResponse
    | typeof INVALID_TOKEN;
