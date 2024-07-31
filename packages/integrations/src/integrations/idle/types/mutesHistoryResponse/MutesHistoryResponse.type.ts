import { INVALID_TOKEN } from '@integrations/idle/contants';

import type {
    IFailedResponse as IFailedMutesHistoryResponse,
    IPunishmentList as ISuccessfulMutesHistoryResponse,
} from '../common';

export type MutesHistoryResponse =
    | ISuccessfulMutesHistoryResponse
    | IFailedMutesHistoryResponse
    | typeof INVALID_TOKEN;
