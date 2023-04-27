import type { SchemaOverview } from '@directus/types';
import type { Knex } from 'knex';
import type { Snapshot, SnapshotDiff } from '../types/index.js';
export declare function applySnapshot(snapshot: Snapshot, options?: {
    database?: Knex;
    schema?: SchemaOverview;
    current?: Snapshot;
    diff?: SnapshotDiff;
}): Promise<void>;
