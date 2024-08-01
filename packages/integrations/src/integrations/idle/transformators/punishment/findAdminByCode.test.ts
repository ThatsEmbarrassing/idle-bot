import { findAdminNameByCode } from './findAdminByCode';

import { ADMIN_CODES } from './constants';

describe('findAdminByCode', () => {
    it('should return admin name if the code is in the ADMIN_CODES', () => {
        const adminNikoName = findAdminNameByCode(508);
        const adminRedName = findAdminNameByCode(515);
        const adminEmberName = findAdminNameByCode(517);

        expect(adminNikoName).toBe(ADMIN_CODES[508]);
        expect(adminRedName).toBe(ADMIN_CODES[515]);
        expect(adminEmberName).toBe(ADMIN_CODES[517]);
    });

    it("should return UNKNOWN if the code isn't in the ADMIN_CODES", () => {
        const adminName = findAdminNameByCode(111);

        expect(adminName).toBe('UNKNOWN');
    });
});
