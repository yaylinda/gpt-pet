import type { Database } from '@/gen';
import type moment from 'moment';

export type TaskRow = Database['public']['Tables']['tasks']['Row'];

export interface Task {
    id: string;
    title: string;
    type: string;
    difficulty: string;
    createdAt: moment.Moment;
    userId: string;
}
