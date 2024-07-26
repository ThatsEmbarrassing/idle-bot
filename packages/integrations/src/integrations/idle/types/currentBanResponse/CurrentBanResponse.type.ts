import { INVALID_TOKEN } from '../../contants';

import type {
    IBasePunishment as ISuccessfulCurrentBanResponse,
    IFailedResponse as IFailedCurrentBanResponse,
} from '../common';

export type CurrentBanResponse =
    | ISuccessfulCurrentBanResponse
    | IFailedCurrentBanResponse
    | typeof INVALID_TOKEN;
