import { Injectable } from '@nestjs/common';

import { ID as SteamID } from '@node-steam/id';

import { safeExtract } from '@idle-discord-bot/utils';

import { IdleService, SteamService } from '../../integrations';

import type { ICombinedProfile } from './types';

@Injectable()
export class ProfileFactory {
    private async combineSteamInfo(steamID: SteamID) {
        const [steamPlayerSummaries, steamPlayerBans] = await Promise.all([
            this.steamService.getPlayerSummaries(steamID.get64()),
            this.steamService.getPlayerBans(steamID.get64()),
        ]);

        return steamPlayerSummaries.ap(
            steamPlayerBans.map(
                ({ VACBanned }) =>
                    ({ steamid, profileurl, avatarfull: avatar, personaname: nickname }) => ({
                        nickname,
                        steamid: new SteamID(steamid).get2(),
                        profileurl,
                        avatar,
                        vac: VACBanned,
                    }),
            ),
        );
    }

    private async combineIdleInfo(steamID: SteamID) {
        const [profile, currentMute, currentBan, mutesHistory, bansHistory] = await Promise.all([
            this.idleService.getProfile(steamID.get2()),
            this.idleService.getCurrentMute(steamID.get2()),
            this.idleService.getCurrentBan(steamID.get2()),
            this.idleService.getMutesHistory(steamID.get2()),
            this.idleService.getBansHistory(steamID.get2()),
        ]);

        return profile.map((value) => ({
            ...value,
            punishments: {
                mutes: {
                    current: safeExtract(currentMute),
                    history: safeExtract(mutesHistory),
                },
                bans: {
                    current: safeExtract(currentBan),
                    history: safeExtract(bansHistory),
                },
            },
        }));
    }

    private async combineAllInfo(steamID: SteamID): Promise<ICombinedProfile> {
        const [idleCombinedInfo, steamCombinedInfo] = await Promise.all([
            this.combineIdleInfo(steamID),
            this.combineSteamInfo(steamID),
        ]);

        return {
            ...safeExtract(idleCombinedInfo),
            ...safeExtract(steamCombinedInfo),
        } as ICombinedProfile;
    }

    constructor(
        private readonly idleService: IdleService,
        private readonly steamService: SteamService,
    ) {}

    async getProfile(steamID: SteamID) {
        const result = await this.combineAllInfo(steamID);

        return result;
    }
}
