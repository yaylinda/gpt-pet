import type { Database } from '@/gen';
import type moment from 'moment';

export type UserRow = Database['public']['Tables']['users']['Row'];

export interface User {
    id: string;
    createdAt: moment.Moment;
    displayName: string;
    hasRegistered: boolean;
}
