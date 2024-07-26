import { findPunishmentNameByCode } from './findPunishmentNameByCode';
import { findMethodNameBySid } from './findMethodBySid';
import { findAdminNameByCode } from './findAdminByCode';

import { returnLongRemoveType } from './returnLongRemoveType';

import type { IBasePunishment } from '../../types/common';

import type { IdleUserPunishment } from './types';

export function punishmentTransformator(value: IBasePunishment): IdleUserPunishment {
    const {
        created,
        ends,
        name,
        reason,
        sid,
        type,
        RemoveType: removeType,
        RemovedBy: removedBy,
        RemovedOn: removedOn,
        ureason: removeReason,
    } = value;

    return {
        name,
        created: created * 1000,
        ends: created === ends ? -1 : ends * 1000,
        reason,
        removedOn,
        removeReason,
        type: findPunishmentNameByCode(type),
        method: findMethodNameBySid(sid),
        removeType: returnLongRemoveType(removeType),
        removedBy: !!removedBy ? findAdminNameByCode(removedBy) : null,
    };
}
