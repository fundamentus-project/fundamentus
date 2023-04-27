import { getDate, getDay, getWeek, parseISO } from 'date-fns';
export const functions = {
    year,
    month,
    week,
    day,
    weekday,
    hour,
    minute,
    second,
    count,
};
/**
 * Extract the year from a given ISO-8601 date
 */
function year(value) {
    return parseISO(value).getUTCFullYear();
}
function month(value) {
    // Match DB by using 1-indexed months
    return parseISO(value).getUTCMonth() + 1;
}
function week(value) {
    return getWeek(parseISO(value));
}
function day(value) {
    return getDate(parseISO(value));
}
function weekday(value) {
    return getDay(parseISO(value));
}
function hour(value) {
    return parseISO(value).getUTCHours();
}
function minute(value) {
    return parseISO(value).getUTCMinutes();
}
function second(value) {
    return parseISO(value).getUTCSeconds();
}
function count(value) {
    return Array.isArray(value) ? value.length : null;
}
