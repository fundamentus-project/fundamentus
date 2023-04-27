import { DateHelper } from '../types.js';
export class DateHelperSQLite extends DateHelper {
    parse(date) {
        if (!date) {
            return date;
        }
        // Date generated from NOW()
        if (date instanceof Date) {
            return String(date.getTime());
        }
        // Return the time as string
        if (date.length <= 8 && date.includes(':')) {
            return date;
        }
        // Return dates in epoch milliseconds
        return String(new Date(date).getTime());
    }
    fieldFlagForField(fieldType) {
        switch (fieldType) {
            case 'timestamp':
                return 'cast-timestamp';
            default:
                return '';
        }
    }
}
