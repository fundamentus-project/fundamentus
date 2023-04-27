import type { OperationHandler } from '@directus/types';
export declare function getFlowManager(): FlowManager;
declare class FlowManager {
    private isLoaded;
    private operations;
    private triggerHandlers;
    private operationFlowHandlers;
    private webhookFlowHandlers;
    private reloadQueue;
    constructor();
    initialize(): Promise<void>;
    reload(): Promise<void>;
    addOperation(id: string, operation: OperationHandler): void;
    clearOperations(): void;
    runOperationFlow(id: string, data: unknown, context: Record<string, unknown>): Promise<unknown>;
    runWebhookFlow(id: string, data: unknown, context: Record<string, unknown>): Promise<unknown>;
    private load;
    private unload;
    private executeFlow;
    private executeOperation;
}
export {};
