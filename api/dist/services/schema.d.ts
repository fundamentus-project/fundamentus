import type { Accountability } from '@directus/types';
import type { Knex } from 'knex';
import type { AbstractServiceOptions, Snapshot, SnapshotDiff, SnapshotDiffWithHash, SnapshotWithHash } from '../types/index.js';
export declare class SchemaService {
    knex: Knex;
    accountability: Accountability | null;
    constructor(options: Omit<AbstractServiceOptions, 'schema'>);
    snapshot(): Promise<Snapshot>;
    apply(payload: SnapshotDiffWithHash): Promise<void>;
    diff(snapshot: Snapshot, options?: {
        currentSnapshot?: Snapshot;
        force?: boolean;
    }): Promise<SnapshotDiff | null>;
    getHashedSnapshot(snapshot: Snapshot): SnapshotWithHash;
}
