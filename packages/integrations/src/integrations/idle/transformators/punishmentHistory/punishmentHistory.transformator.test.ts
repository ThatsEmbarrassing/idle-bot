import { PunishmentCode, PunishmentName } from '@integrations/idle/enums';

import * as punishment from '../punishment';

import { METHOD_SIDS } from '../punishment/constants';

import { punishmentHistoryTransformator } from './punishmentHistory.transformator';

import type { IPunishmentList, IBasePunishment } from '@integrations/idle/types';

import type { IdleUserPunishment } from '../punishment';

import type { IdleUserPunishmentHistory } from './types';

const punishmentItem: IBasePunishment = {
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

const userPunishment: IdleUserPunishment = {
    removedBy: null,
    removedOn: null,
    removeReason: null,
    removeType: null,
    name: punishmentItem.name,
    reason: punishmentItem.reason,
    created: punishmentItem.created * 1000,
    ends: punishmentItem.ends * 1000,
    type: PunishmentName.CHAT,
    method: METHOD_SIDS[punishmentItem.sid],
};

const punishmentList: IPunishmentList = {
    Items: new Array(3).fill({ ...punishmentItem }),
};

const expectedUserPunishmentHistory: IdleUserPunishmentHistory = {
    length: 3,
    items: new Array(3).fill({ ...userPunishment }),
};

const emptyPunishmentList: IPunishmentList = {
    Items: [],
};

const expectedEmptyUserPunishmentHistory: IdleUserPunishmentHistory = {
    length: 0,
    items: [],
};

jest.spyOn(punishment, 'punishmentTransformator').mockReturnValue(userPunishment);

describe('punishmentHistory transformator', () => {
    it("should return modified object about all player's punishments", () => {
        const userPunishmentHistory = punishmentHistoryTransformator(punishmentList);
        expect(userPunishmentHistory).toEqual(expectedUserPunishmentHistory);
    });

    it('should return modified object with no items', () => {
        const userPunishmentHistory = punishmentHistoryTransformator(emptyPunishmentList);
        expect(userPunishmentHistory).toEqual(expectedEmptyUserPunishmentHistory);
    });
});
