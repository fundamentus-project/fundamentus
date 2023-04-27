import type { ValidationErrorItem } from 'joi';
import { BaseException } from './base.js';
export declare class FailedValidationException extends BaseException {
    constructor(error: ValidationErrorItem);
}
