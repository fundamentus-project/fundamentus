import type { Driver } from '../../types/index.js';
export declare const drivers: Record<Driver, string>;
export declare function getDriverForClient(client: string): Driver | null;
