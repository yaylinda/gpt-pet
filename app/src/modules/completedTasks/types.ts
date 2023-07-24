import type { Database } from '@/gen';
import type moment from 'moment';

export type CompletedTaskRow =
    Database['public']['Tables']['completed_tasks']['Row'];

export interface CompletedTask {
    date: moment.Moment;
    taskId: string;
    userId: string;
}
