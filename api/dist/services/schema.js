import getDatabase from '../database/index.js';
import { ForbiddenException } from '../exceptions/index.js';
import { applyDiff } from '../utils/apply-diff.js';
import { getSnapshot } from '../utils/get-snapshot.js';
import { getSnapshotDiff } from '../utils/get-snapshot-diff.js';
import { getVersionedHash } from '../utils/get-versioned-hash.js';
import { validateApplyDiff } from '../utils/validate-diff.js';
import { validateSnapshot } from '../utils/validate-snapshot.js';
export class SchemaService {
    knex;
    accountability;
    constructor(options) {
        this.knex = options.knex ?? getDatabase();
        this.accountability = options.accountability ?? null;
    }
    async snapshot() {
        if (this.accountability?.admin !== true)
            throw new ForbiddenException();
        const currentSnapshot = await getSnapshot({ database: this.knex });
        return currentSnapshot;
    }
    async apply(payload) {
        if (this.accountability?.admin !== true)
            throw new ForbiddenException();
        const currentSnapshot = await this.snapshot();
        const snapshotWithHash = this.getHashedSnapshot(currentSnapshot);
        if (!validateApplyDiff(payload, snapshotWithHash))
            return;
        await applyDiff(currentSnapshot, payload.diff, { database: this.knex });
    }
    async diff(snapshot, options) {
        if (this.accountability?.admin !== true)
            throw new ForbiddenException();
        validateSnapshot(snapshot, options?.force);
        const currentSnapshot = options?.currentSnapshot ?? (await getSnapshot({ database: this.knex }));
        const diff = getSnapshotDiff(currentSnapshot, snapshot);
        if (diff.collections.length === 0 && diff.fields.length === 0 && diff.relations.length === 0) {
            return null;
        }
        return diff;
    }
    getHashedSnapshot(snapshot) {
        const snapshotHash = getVersionedHash(snapshot);
        return {
            ...snapshot,
            hash: snapshotHash,
        };
    }
}
