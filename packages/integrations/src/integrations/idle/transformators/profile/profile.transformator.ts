import { profileRankTransformator } from './profileRank.transformator';
import { profileVipTransformator } from './profileVip.transformator';

import type { ISuccessfulGetProfileResponse as IProfileResponse } from '../../types/profileResponse';

import type { IdleUserProfile } from './types';

export function profileTransformator(value: IProfileResponse): IdleUserProfile {
    return {
        rank: profileRankTransformator(value),
        vip: profileVipTransformator(value),
    };
}
