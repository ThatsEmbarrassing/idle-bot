import { IFormatter } from '@idle-discord-bot/utils';

export class VACBanFormatter implements IFormatter<boolean> {
    format(data: boolean) {
        return data ? 'Есть.' : 'Отсутствует.';
    }
}
