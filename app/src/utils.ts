import moment from 'moment';

/**
 *
 * @param list
 */
export const reduce = <T extends { id: string }>(
    list: T[]
): Record<string, T> =>
        list.reduce<Record<string, T>>((prev, curr) => {
            prev[curr.id] = curr;
            return prev;
        }, {});

/**
 *
 * @param date
 */
export const formatMoment = (date: moment.Moment) => {
    if (Math.abs(date.diff(moment(), 'hour')) < 2) {
        return date.fromNow();
    }
    if (date.isSame(moment(), 'day')) {
        return date.format('h:mm a'); //
    }
    if (date.isSame(moment(), 'year')) {
        return `${date.format('l').slice(0, -5)} ${date.format('h:mm a')}`;
    }
    return `${date.format('l')} ${date.format('h:mm a')}`;
};

/**
 *
 * @param string
 */
export function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

export const formatDateHeader = (date: moment.Moment) => {
    if (date.isSame(moment(), 'day')) {
        return 'Today';
    }

    if (date.isSame(moment().subtract(1, 'day'), 'day')) {
        return 'Yesterday';
    }

    return date.format('MMM Do');
};
