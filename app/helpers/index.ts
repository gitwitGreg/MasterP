
/** Convert long strings to no more than 20 characters */
export function shortenString(str: string) {

    if (str.length <= 15) {

        return str;

    } else {

        return str.substring(0, 20) + "...";
        
    }
}

/** Converts strings time stamp to formated 12 hour intervals */
export function convertTime(time24: string) {

    const [hour, minute, second] = time24.split(':').map(Number);

    const hour12 = hour % 12 || 12;

    const period = hour >= 12 ? 'PM' : 'AM';

    const formattedMinute = minute.toString().padStart(2, '0');

    return `${hour12}:${formattedMinute} ${period}`;

}


/** Converts string number date to specify month and day */
export function convertDate(date: string) {

    const parsed = date.split('');

    const remYear = parsed.splice(0,5);

    const remExtra = parsed.splice(1, remYear.length-1);

    const months: { [key: number]: string } = {
        0: 'jan', 1: 'feb', 2: 'mar', 3: 'apr',
        4: 'may', 5: 'jun', 6: 'jul', 7: 'aug',
        8: 'sep', 9: 'oct', 10: 'nov', 11: 'dec'
    };

    const month = months[Number(remExtra[0])];

    const converted = `${month} ${remExtra[2]}${remExtra[3]}`

    return converted

}

/** Convert dollars to cents for subcurrency for stripe */

export function convertToSubcurrency (amount: number, factor = 100) {
    return Math.round(amount * factor);
}
