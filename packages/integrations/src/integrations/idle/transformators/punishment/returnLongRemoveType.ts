import { PunishmentShortRemoveType, PunishmentLongRemoveType } from '../../enums';

export const returnLongRemoveType = (
    short: PunishmentShortRemoveType | null,
): PunishmentLongRemoveType | null => {
    if (!short) return null;

    const foundKey = Object.keys(PunishmentShortRemoveType).find(
        (key) => PunishmentShortRemoveType[key] === short,
    );

    return PunishmentLongRemoveType[foundKey!];
};
