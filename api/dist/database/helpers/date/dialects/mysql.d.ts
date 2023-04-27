import { DateHelper } from '../types.js';
export declare class DateHelperMySQL extends DateHelper {
    readTimestampString(date: string): string;
    writeTimestamp(date: string): Date;
}
