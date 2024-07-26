export interface IFormatter<T> {
    format(data: T): string;
}
