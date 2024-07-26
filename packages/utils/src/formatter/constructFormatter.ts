import type { IFormatter } from './types';

type Constructor<TArgs extends [...unknown[]], TClass> = new (...args: TArgs) => TClass;

export type FormatCallback<T> = (data: T | null | undefined, defaultValue?: string) => string;

export function constructFormatter<T>(
    formatterConstructor: Constructor<[], IFormatter<T>>,
): FormatCallback<T> {
    return (data, defaultValue) => {
        if (data === null || data === undefined) return defaultValue ?? 'null';

        return new formatterConstructor().format(data);
    };
}
