/// <reference types="node" resolution-mode="require"/>
import type { Readable } from 'node:stream';
export declare const isReadableStream: (input: any) => input is Readable;
