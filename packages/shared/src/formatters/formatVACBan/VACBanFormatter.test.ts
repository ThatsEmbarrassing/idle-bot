import { constructFormatter } from '@idle-discord-bot/utils';

import { VACBanFormatter } from './VACBanFormatter';

const formatVACBan = constructFormatter(VACBanFormatter);

describe('VACBanFormatter', () => {
    it('should format VAC Ban parameter', () => {
        expect(formatVACBan(true)).toBe('Есть.');
        expect(formatVACBan(false)).toBe('Отсутствует.');
    });
});
