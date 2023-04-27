import { DateHelper } from '../types.js';
export declare class DateHelperSQLite extends DateHelper {
    parse(date: string | Date): string;
    fieldFlagForField(fieldType: string): string;
}
