import { CustomError } from 'ts-custom-error';

export class BadSteamIDFormatError extends CustomError {
    constructor(
        public readonly input: string,
        options?: { cause?: unknown },
    ) {
        super(`Invalid SteamID format: ${input}`, options);
    }
}
