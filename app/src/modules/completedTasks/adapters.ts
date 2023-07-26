import moment from 'moment';
import type {
    CompletedTask,
    CompletedTaskRow,
} from '@modules/completedTasks/types';
import { getDateKey } from '@/utils';

export const completedTaskAdapter = (row: CompletedTaskRow): CompletedTask => ({
    createdAt: moment(row.created_at).startOf('day'),
    dateKey: getDateKey(moment(row.created_at)),
    taskId: row.task_id,
    userId: row.user_id,
});
