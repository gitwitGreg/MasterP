export function shortenString(str: string) {

    if (str.length <= 15) {

        return str;

    } else {

        return str.substring(0, 20) + "...";
        
    }
}

export function convertTime(time24: string) {

    const [hour, minute, second] = time24.split(':').map(Number);

    const hour12 = hour % 12 || 12;

    const period = hour >= 12 ? 'PM' : 'AM';

    const formattedMinute = minute.toString().padStart(2, '0');

    return `${hour12}:${formattedMinute} ${period}`;

}
