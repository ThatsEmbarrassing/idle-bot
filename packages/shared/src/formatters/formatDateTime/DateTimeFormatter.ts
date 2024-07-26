import { IFormatter } from '@idle-discord-bot/utils';

export class DateTimeFormatter implements IFormatter<Date | number> {
    private static dateTimeFormat = Intl.DateTimeFormat('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    format(data: Date | number): string {
        return DateTimeFormatter.dateTimeFormat.format(data);
    }
}
