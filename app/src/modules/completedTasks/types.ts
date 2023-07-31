import type { Database } from '@/gen';
import type moment from 'moment';

export type CompletedTaskRow = Database['public']['Tables']['completed_tasks']['Row'];
export type CompletedTaskInsert = Database['public']['Tables']['completed_tasks']['Insert'];

export interface CompletedTask {
    createdAt: moment.Moment;
    dateKey: string;
    taskId: string;
    userId: string;
}
