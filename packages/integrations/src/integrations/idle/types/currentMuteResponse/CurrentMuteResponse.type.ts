import { INVALID_TOKEN } from '@integrations/idle/contants';

import type {
    IBasePunishment as ISuccessfulCurrentMuteResponse,
    IFailedResponse as IFailedCurrentMuteResponse,
} from '../common';

export type CurrentMuteResponse =
    | ISuccessfulCurrentMuteResponse
    | IFailedCurrentMuteResponse
    | typeof INVALID_TOKEN;
