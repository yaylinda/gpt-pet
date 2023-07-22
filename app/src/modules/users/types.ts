import moment from 'moment';

export interface User {
    id: string;
    createdAt: moment.Moment;
    displayName: string;
    hasRegistered: boolean;
}
