import { PunishmentCode, PunishmentName } from '../../enums';

export const findPunishmentNameByCode = (code: PunishmentCode): PunishmentName => {
    const foundKey = Object.keys(PunishmentCode).find((key) => {
        return PunishmentCode[key] === code;
    });

    return PunishmentName[foundKey!];
};
