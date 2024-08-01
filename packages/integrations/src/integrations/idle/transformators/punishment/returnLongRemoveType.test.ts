import { PunishmentShortRemoveType, PunishmentLongRemoveType } from '@integrations/idle/enums';

import { returnLongRemoveType } from './returnLongRemoveType';

describe('returnLongRemoveType', () => {
    it('should return long removed punishment type name from the short one', () => {
        const expiredRemoveType = returnLongRemoveType(PunishmentShortRemoveType.EXPIRED);
        const unpunishedRemoveType = returnLongRemoveType(PunishmentShortRemoveType.UNPUNISHED);

        expect(expiredRemoveType).toBe(PunishmentLongRemoveType.EXPIRED);
        expect(unpunishedRemoveType).toBe(PunishmentLongRemoveType.UNPUNISHED);
    });

    it('should return null from null', () => {
        const nullRemoveType = returnLongRemoveType(null);

        expect(nullRemoveType).toBeNull();
    });
});
