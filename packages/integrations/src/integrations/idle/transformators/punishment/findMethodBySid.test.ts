import { findMethodNameBySid } from './findMethodBySid';

import { METHOD_SIDS } from './constants';

describe('findMethodBySid', () => {
    it('should return method name if the sid is in the METHOD_SIDS', () => {
        const webMethod = findMethodNameBySid(0);
        const engineer2Method = findMethodNameBySid(4);
        const idleMethod = findMethodNameBySid(6);

        expect(webMethod).toBe(METHOD_SIDS[0]);
        expect(engineer2Method).toBe(METHOD_SIDS[4]);
        expect(idleMethod).toBe(METHOD_SIDS[6]);
    });

    it("should return UNKNOWN if the sid isn't in the METHOD_SIDS", () => {
        const method = findMethodNameBySid(13);

        expect(method).toBe('UNKNOWN');
    });
});
