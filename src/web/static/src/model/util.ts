export function parseDate(dateString: string): Date {
    const [day, month, year] = dateString.split('.')
    return new Date(parseInt(year), parseInt(month), parseInt(day));
}