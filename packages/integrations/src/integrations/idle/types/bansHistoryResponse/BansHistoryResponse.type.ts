import { INVALID_TOKEN } from '@integrations/idle/contants';

import type {
    IFailedResponse as IFailedBansHistoryResponse,
    IPunishmentList as ISuccessfulBansHistoryResponse,
} from '../common';

export type BansHistoryResponse =
    | ISuccessfulBansHistoryResponse
    | IFailedBansHistoryResponse
    | typeof INVALID_TOKEN;
