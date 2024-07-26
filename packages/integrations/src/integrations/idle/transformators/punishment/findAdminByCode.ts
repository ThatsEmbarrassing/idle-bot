import { ADMIN_CODES } from './constants';

type TFindAdminNameByCodeResult<T extends number> = T extends keyof typeof ADMIN_CODES
    ? (typeof ADMIN_CODES)[T]
    : 'UNKNOWN';

export const findAdminNameByCode = <T extends number>(code: T): TFindAdminNameByCodeResult<T> => {
    return (
        code in ADMIN_CODES ? ADMIN_CODES[code as keyof typeof ADMIN_CODES] : 'UNKNOWN'
    ) as TFindAdminNameByCodeResult<T>;
};
