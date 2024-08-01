import { INVALID_TOKEN } from '@/integrations/idle/constants';

import type {
    IBasePunishment as ISuccessfulCurrentBanResponse,
    IFailedResponse as IFailedCurrentBanResponse,
} from '../common';

export type CurrentBanResponse =
    | ISuccessfulCurrentBanResponse
    | IFailedCurrentBanResponse
    | typeof INVALID_TOKEN;
