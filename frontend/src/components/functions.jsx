export function humanizeDateTime(dateTimeString) {
    if (!dateTimeString){
        return ""
    }
    const date = new Date(dateTimeString);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}

export function getTimeDifferenceInHours(endDateTimeString, startDateTimeString) {
    if (!endDateTimeString || !startDateTimeString){
        return null
    }
    const startDate = new Date(startDateTimeString);
    const endDate = new Date(endDateTimeString);
    const timeDifferenceMs = endDate - startDate;
    const timeDifferenceHours = timeDifferenceMs / (1000 * 60 * 60);
    return timeDifferenceHours?.toFixed(2);
}