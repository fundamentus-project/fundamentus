/// <reference types="node" resolution-mode="require"/>
import * as http from 'http';
export declare let SERVER_ONLINE: boolean;
export declare function createServer(): Promise<http.Server>;
export declare function startServer(): Promise<void>;
