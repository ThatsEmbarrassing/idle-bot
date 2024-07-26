import { INVALID_TOKEN } from '../../contants';

import type {
    IFailedResponse as IFailedMutesHistoryResponse,
    IPunishmentList as ISuccessfulMutesHistoryResponse,
} from '../common';

export type MutesHistoryResponse =
    | ISuccessfulMutesHistoryResponse
    | IFailedMutesHistoryResponse
    | typeof INVALID_TOKEN;
