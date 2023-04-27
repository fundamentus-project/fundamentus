import type { ActionHandler, EventContext, FilterHandler, InitHandler } from '@directus/types';
export declare class Emitter {
    private filterEmitter;
    private actionEmitter;
    private initEmitter;
    constructor();
    emitFilter<T>(event: string | string[], payload: T, meta: Record<string, any>, context: EventContext): Promise<T>;
    emitAction(event: string | string[], meta: Record<string, any>, context: EventContext): void;
    emitInit(event: string, meta: Record<string, any>): Promise<void>;
    onFilter(event: string, handler: FilterHandler): void;
    onAction(event: string, handler: ActionHandler): void;
    onInit(event: string, handler: InitHandler): void;
    offFilter(event: string, handler: FilterHandler): void;
    offAction(event: string, handler: ActionHandler): void;
    offInit(event: string, handler: InitHandler): void;
    offAll(): void;
}
declare const emitter: Emitter;
export default emitter;
