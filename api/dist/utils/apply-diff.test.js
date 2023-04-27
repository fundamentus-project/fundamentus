import { describe, expect, it } from 'vitest';
import { isNestedMetaUpdate } from './apply-diff.js';
describe('isNestedMetaUpdate', () => {
    it.each([
        { kind: 'E', path: ['meta', 'options', 'option_a'], rhs: {} },
        { kind: 'A', path: ['meta', 'options', 'option_a'], rhs: [] },
    ])('Returns false when diff is kind $kind', (diff) => {
        expect(isNestedMetaUpdate(diff)).toBe(false);
    });
    it.each([
        { kind: 'N', path: ['schema', 'default_value'], rhs: {} },
        { kind: 'D', path: ['schema'], lhs: {} },
    ])('Returns false when diff path is not nested in meta', (diff) => {
        expect(isNestedMetaUpdate(diff)).toBe(false);
    });
    it.each([
        { kind: 'N', path: ['meta', 'options', 'option_a'], rhs: { test: 'value' } },
        { kind: 'D', path: ['meta', 'options', 'option_b'], lhs: {} },
    ])('Returns true when diff path is nested in meta', (diff) => {
        expect(isNestedMetaUpdate(diff)).toBe(true);
    });
});
