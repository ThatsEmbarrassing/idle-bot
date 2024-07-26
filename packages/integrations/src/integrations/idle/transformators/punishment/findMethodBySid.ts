import { METHOD_SIDS } from './constants';

type TFindMethodNameBySidResult<T extends number> = T extends keyof typeof METHOD_SIDS
    ? (typeof METHOD_SIDS)[T]
    : 'UNKNOWN';

export const findMethodNameBySid = <T extends number>(sid: T): TFindMethodNameBySidResult<T> => {
    return (
        sid in METHOD_SIDS ? METHOD_SIDS[sid as keyof typeof METHOD_SIDS] : 'UNKNOWN'
    ) as TFindMethodNameBySidResult<T>;
};
