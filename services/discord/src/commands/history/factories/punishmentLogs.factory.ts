import { Injectable } from '@nestjs/common';

@Injectable()
export class PunishmentLogsFactory {
    private static readonly NUMBER_OF_SPECIAL_SYMBOLS = 4;
    private static readonly MAXIMUM_LENGTH_OF_MESSAGE = 2000;

    private calculateLogsLength = (acc: string[], log: string) => {
        const lengthOfAcc = acc.reduce((value: number, log: string) => value + log.length, 0);

        return lengthOfAcc + log.length;
    };

    public createLogsMessages = (acc: string[][], log: string) => {
        const last = acc.at(-1)!;

        const length =
            this.calculateLogsLength(last, log) + PunishmentLogsFactory.NUMBER_OF_SPECIAL_SYMBOLS;

        if (length <= PunishmentLogsFactory.MAXIMUM_LENGTH_OF_MESSAGE) {
            last.push(log);
        } else acc.push([log]);

        return acc;
    };
}
