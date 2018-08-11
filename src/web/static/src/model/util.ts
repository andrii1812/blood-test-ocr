export function parseDate(dateString: string): Date {
    const [day, month, year] = dateString.split('.')
    return new Date(parseInt(year), parseInt(month), parseInt(day));
}

export function formatDate(date: Date): string {
    const [day, month, year] = [date.getDate(), date.getMonth() + 1, date.getFullYear()];
    return day + '.' + month + '.' + year;
}