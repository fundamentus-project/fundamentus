import type { File, Transformation, TransformationParams } from '../types/index.js';
export declare function resolvePreset(input: TransformationParams, file: File): Transformation[];
/**
 * Try to extract a file format from an array of `Transformation`'s.
 */
export declare function maybeExtractFormat(transforms: Transformation[]): string | undefined;
