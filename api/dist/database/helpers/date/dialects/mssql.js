import { DateHelper } from '../types.js';
import { parseISO } from 'date-fns';
export class DateHelperMSSQL extends DateHelper {
    writeTimestamp(date) {
        const parsedDate = parseISO(date);
        return new Date(parsedDate.getTime() + parsedDate.getTimezoneOffset() * 60000);
    }
}
