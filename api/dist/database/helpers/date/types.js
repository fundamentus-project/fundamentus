import { DatabaseHelper } from '../types.js';
import { parseISO } from 'date-fns';
export class DateHelper extends DatabaseHelper {
    parse(date) {
        // Date generated from NOW()
        if (date instanceof Date) {
            return date.toISOString();
        }
        return date;
    }
    readTimestampString(date) {
        return date;
    }
    writeTimestamp(date) {
        return parseISO(date);
    }
    fieldFlagForField(_fieldType) {
        return '';
    }
}
