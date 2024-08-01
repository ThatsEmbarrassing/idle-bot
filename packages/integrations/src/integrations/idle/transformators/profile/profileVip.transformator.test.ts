import { profileVipTransformator } from './profileVip.transformator';

import type { ISuccessfulGetProfileResponse as IProfileResponse } from '@/integrations/idle/types';

import type { IdleUserVIP } from './types';

const vipEnabled: IProfileResponse['Vipka'] = {
    HasVipka: true,
    created: 1721921745,
    ends: 1724600145,
    length: 111111,
};

const profileVipEnabled = {
    Vipka: vipEnabled,
} as IProfileResponse;

const vipDisabled: IProfileResponse['Vipka'] = {
    HasVipka: false,
    created: 0,
    ends: 0,
    length: 0,
};

const profileVipDisabled = {
    Vipka: vipDisabled,
} as IProfileResponse;

const expectedVipEnabled: IdleUserVIP = {
    enabled: true,
    created: vipEnabled.created * 1000,
    ends: vipEnabled.ends * 1000,
    length: vipEnabled.length,
};

const expectedVipDisabled: IdleUserVIP = {
    enabled: false,
    created: 0,
    ends: 0,
    length: 0,
};

describe('profileVip transformator', () => {
    it('should return modified object about enabled player VIP status', () => {
        const userVip = profileVipTransformator(profileVipEnabled);
        expect(userVip).toEqual(expectedVipEnabled);
    });

    it('should return modified object about disabled player VIP status', () => {
        const userVip = profileVipTransformator(profileVipDisabled);
        expect(userVip).toEqual(expectedVipDisabled);
    });
});
