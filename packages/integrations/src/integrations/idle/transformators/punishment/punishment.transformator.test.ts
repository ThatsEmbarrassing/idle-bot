import {
    PunishmentCode,
    PunishmentLongRemoveType,
    PunishmentName,
    PunishmentShortRemoveType,
} from '@integrations/idle/enums';

import { METHOD_SIDS, ADMIN_CODES } from './constants';

import { punishmentTransformator } from './punishment.transformator';

import type { IBasePunishment } from '@integrations/idle/types';

import type { IdleUserPunishment } from './types';

const punishmentResponse: IBasePunishment = {
    created: 1724600145,
    ends: 1727278545,
    name: 'test',
    authid: 'test',
    reason: 'test reason',
    sid: 6,
    type: PunishmentCode.CHAT,
    RemovedBy: null,
    RemovedOn: null,
    RemoveType: null,
    ureason: null,
};

const expectedUserPunishment: IdleUserPunishment = {
    removedBy: null,
    removedOn: null,
    removeReason: null,
    removeType: null,
    name: punishmentResponse.name,
    reason: punishmentResponse.reason,
    created: punishmentResponse.created * 1000,
    ends: punishmentResponse.ends * 1000,
    type: PunishmentName.CHAT,
    method: METHOD_SIDS[punishmentResponse.sid],
};

const permanentPunishmentResponse: IBasePunishment = {
    ...punishmentResponse,
    ends: punishmentResponse.created,
};

const expectedPermanentUserPunishment: IdleUserPunishment = {
    ...expectedUserPunishment,
    ends: -1,
};

const removedPunishmentResponse: IBasePunishment = {
    ...punishmentResponse,
    RemovedBy: 512,
    RemovedOn: 1724772945,
    RemoveType: PunishmentShortRemoveType.UNPUNISHED,
    ureason: 'test ureason',
};

const expectedRemovedUserPunishment: IdleUserPunishment = {
    ...expectedUserPunishment,
    removedOn: removedPunishmentResponse.RemovedOn,
    removeReason: removedPunishmentResponse.ureason,
    removeType: PunishmentLongRemoveType.UNPUNISHED,
    removedBy: ADMIN_CODES[removedPunishmentResponse.RemovedBy!],
};

describe('punishment transformator', () => {
    it('should return modified object about punishment information', () => {
        const userPunishment = punishmentTransformator(punishmentResponse);
        expect(userPunishment).toEqual(expectedUserPunishment);
    });

    it('should return modified object about permanent punishment information', () => {
        const userPunishment = punishmentTransformator(permanentPunishmentResponse);
        expect(userPunishment).toEqual(expectedPermanentUserPunishment);
    });

    it('should return modified object about removed punishment information', () => {
        const userPunishment = punishmentTransformator(removedPunishmentResponse);
        expect(userPunishment).toEqual(expectedRemovedUserPunishment);
    });
});
