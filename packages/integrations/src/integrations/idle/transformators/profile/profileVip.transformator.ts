import type { ISuccessfulGetProfileResponse as IProfileResponse } from '../../types/profileResponse';

import type { IdleUserVIP } from './types';

export const profileVipTransformator = (profile: IProfileResponse): IdleUserVIP => {
    const {
        Vipka: { HasVipka: enabled, created, ends, ...other },
    } = profile;

    return {
        enabled,
        created: created * 1000,
        ends: ends * 1000,
        ...other,
    };
};
