import { intlFormatDistance } from 'date-fns';

import { PunishmentType } from '@idle-discord-bot/integrations';

import { IFormatter } from '@idle-discord-bot/utils';

import { formatDateTime } from '../formatDateTime';

import type { IdleUserPunishment } from '@idle-discord-bot/integrations';

export class PunishmentFormatter implements IFormatter<IdleUserPunishment> {
    private static formattedPunishmentTypes: Record<PunishmentType, [string, string]> = {
        [PunishmentType.BAN]: ['Забанен', 'Разбанен'],
        [PunishmentType.CHAT]: ['Замучен по текстовому чату', 'Размучен'],
        [PunishmentType.VOICE]: ['Замучен по голосовому чату', 'Размучен'],
        [PunishmentType.SILENCE]: ['Замучен по текстовому и голосовому чату', 'Размучен'],
    };

    private static formatPunishmentType(punishmentType: PunishmentType) {
        return this.formattedPunishmentTypes[punishmentType][0];
    }

    private static formatRemovePunishmentType(punishmentType: PunishmentType) {
        return this.formattedPunishmentTypes[punishmentType][1];
    }

    private createdFormattedDate(data: IdleUserPunishment) {
        return `**${formatDateTime(data.created)}**`;
    }

    private endsFormattedDate(data: IdleUserPunishment) {
        return data.ends === -1 ? '**навсегда**' : `до **${formatDateTime(data.ends)}**`;
    }

    private deadlineFormattedDate(data: IdleUserPunishment) {
        const { ends, removedOn } = data;

        const now = Date.now();

        return ends === -1
            ? ''
            : `(${removedOn !== null ? 'закончился' : 'заканчивается!!!'} ${intlFormatDistance(
                  removedOn ? removedOn * 1000 : data.ends,
                  now,
                  {
                      locale: 'ru',
                      unit: 'day',
                  },
              )})`;
    }

    private punishmentVariation(data: IdleUserPunishment) {
        return PunishmentFormatter.formatPunishmentType(data.type);
    }

    private formattedPunishmentMethod(data: IdleUserPunishment) {
        return data.method === 'Web' ? 'через админ-панель' : `на сервере ${data.method}`;
    }

    private formattedReason(data: IdleUserPunishment) {
        return `по причине **${data.reason}**`;
    }

    private removePunishmentVariation(data: IdleUserPunishment) {
        return data.removedOn === null
            ? ''
            : PunishmentFormatter.formatRemovePunishmentType(data.type);
    }

    private removePunishmentDate(data: IdleUserPunishment) {
        return data.removedOn === null ? '' : `**${formatDateTime(data.removedOn * 1000)}**`;
    }

    private removePunishmentAdmin(data: IdleUserPunishment) {
        return data.removedBy === null || data.removedBy === 'Server'
            ? ''
            : `админом *${data.removedBy}*`;
    }

    private removePunishmentReason(data: IdleUserPunishment) {
        return data.removeType === null
            ? ''
            : data.removeType === 'Expired'
              ? 'по причине **истечения срока наказания**.'
              : `по причине **${data.removeReason}**.`;
    }

    private createPunishmentString(data: IdleUserPunishment) {
        const variation = this.punishmentVariation(data);
        const createdDate = this.createdFormattedDate(data);
        const endsDate = this.endsFormattedDate(data);
        const deadlineDate = this.deadlineFormattedDate(data);
        const method = this.formattedPunishmentMethod(data);
        const reason = this.formattedReason(data);

        const punishment = `${variation} ${createdDate} ${endsDate}${deadlineDate} ${method} ${reason}.`;

        return punishment;
    }

    private createRemovePunishmentString(data: IdleUserPunishment) {
        const variation = this.removePunishmentVariation(data);
        const removeDate = this.removePunishmentDate(data);
        const admin = this.removePunishmentAdmin(data);
        const reason = this.removePunishmentReason(data);

        const removePunishment = `${variation} ${removeDate} ${admin} ${reason}`.replace(
            /\s{2,}/, // Removes extra spaces
            ' ',
        );

        return removePunishment;
    }

    public format(data: IdleUserPunishment | null) {
        if (!data) return 'Отсутствует.';

        const punishment = this.createPunishmentString(data);
        const removePunishment = this.createRemovePunishmentString(data);

        return `${punishment} ${removePunishment}`.trim();
    }
}
