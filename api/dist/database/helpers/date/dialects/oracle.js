import { DateHelper } from '../types.js';
export class DateHelperOracle extends DateHelper {
    fieldFlagForField(fieldType) {
        switch (fieldType) {
            case 'dateTime':
                return 'cast-datetime';
            default:
                return '';
        }
    }
}
