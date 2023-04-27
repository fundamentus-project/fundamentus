import type { SnapshotDiffWithHash, SnapshotWithHash } from '../types/snapshot.js';
/**
 * Validates the diff against the current schema snapshot.
 *
 * @returns True if the diff can be applied (valid & not empty).
 */
export declare function validateApplyDiff(applyDiff: SnapshotDiffWithHash, currentSnapshotWithHash: SnapshotWithHash): boolean;
