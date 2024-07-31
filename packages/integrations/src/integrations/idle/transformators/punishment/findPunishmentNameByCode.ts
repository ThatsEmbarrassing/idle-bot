import { PunishmentCode, PunishmentName } from '@integrations/idle/enums';

export const findPunishmentNameByCode = (code: PunishmentCode): PunishmentName => {
    const foundKey = Object.keys(PunishmentCode).find((key) => {
        return PunishmentCode[key] === code;
    });

    return PunishmentName[foundKey!];
};
