import { DateHelper } from '../types.js';
import { parseISO } from 'date-fns';
export class DateHelperMySQL extends DateHelper {
    readTimestampString(date) {
        const parsedDate = new Date(date);
        return new Date(parsedDate.getTime() - parsedDate.getTimezoneOffset() * 60000).toISOString();
    }
    writeTimestamp(date) {
        const parsedDate = parseISO(date);
        return new Date(parsedDate.getTime() + parsedDate.getTimezoneOffset() * 60000);
    }
}
