type Job = () => Promise<void> | void;
export declare class JobQueue {
    private running;
    private jobs;
    constructor();
    enqueue(job: Job): void;
    private run;
}
export {};
