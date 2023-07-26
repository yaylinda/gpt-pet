import type { Database } from '@/gen';
import type moment from 'moment';

export type CompletedTaskRow =
    Database['public']['Tables']['completed_tasks']['Row'];

export interface CompletedTask {
    createdAt: moment.Moment;
    dateKey: string;
    taskId: string;
    userId: string;
}
