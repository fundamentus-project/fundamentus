import { DatabaseHelper } from '../types.js';
export declare abstract class DateHelper extends DatabaseHelper {
    parse(date: string | Date): string;
    readTimestampString(date: string): string;
    writeTimestamp(date: string): Date;
    fieldFlagForField(_fieldType: string): string;
}
