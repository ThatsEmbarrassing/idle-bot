import type { Either } from 'purify-ts/Either';

export function safeExtract<L, R>(either: Either<L, R>): Exclude<L | R, Error> {
    const value = either.extract();

    if (value instanceof Error) throw value;

    return value as Exclude<L | R, Error>;
}
