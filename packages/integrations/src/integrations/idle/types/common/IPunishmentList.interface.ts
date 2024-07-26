import type { IBasePunishment } from './IBasePunishment.interface';
import type { ISuccessfulResponse } from './ISuccessfulResponse.interface';

/* Information about all player's punishments */
export interface IPunishmentList extends ISuccessfulResponse {
    Items: IBasePunishment[];
}
