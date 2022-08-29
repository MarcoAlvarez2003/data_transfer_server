export interface Socket {
    on(event: any, listener: (...args: any[]) => void): Promise<void> | void;
    emit(event: any, ...args: any[]): void;
    disconnect(): void;
    id: string;
}
