import { PunishmentCode, PunishmentName } from '@integrations/idle/enums';

import { findPunishmentNameByCode } from './findPunishmentNameByCode';

describe('findPunishmentNameByCode', () => {
    it('should return punishment name', () => {
        const punishmentBan = findPunishmentNameByCode(PunishmentCode.BAN);
        const punishmentChat = findPunishmentNameByCode(PunishmentCode.CHAT);
        const punishmentVoice = findPunishmentNameByCode(PunishmentCode.VOICE);
        const punishmentSilence = findPunishmentNameByCode(PunishmentCode.SILENCE);

        expect(punishmentBan).toBe(PunishmentName.BAN);
        expect(punishmentChat).toBe(PunishmentName.CHAT);
        expect(punishmentVoice).toBe(PunishmentName.VOICE);
        expect(punishmentSilence).toBe(PunishmentName.SILENCE);
    });
});
