export function parseDate(dateString: string): Date {
    const [day, month, year] = dateString.split('.')
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}

export function formatDate(date: Date): string {
    const [day, month, year] = [date.getDate(), date.getMonth() + 1, date.getFullYear()];
    return padWithZero(day) + '.' + padWithZero(month) + '.' + year;
}

function padWithZero(num: number) {
    const str = num.toString();
    if (str.length > 1) {
        return str;
    }

    return '0' + str;
}