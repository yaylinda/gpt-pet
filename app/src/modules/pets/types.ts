import type moment from 'moment';

export interface Pet {
    id: string;
    type: string;
    natures: string[];
    createdAt: moment.Moment;
    displayName: string;
    userId: string;
}
