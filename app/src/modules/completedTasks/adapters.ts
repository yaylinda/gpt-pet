import moment from 'moment';
import type {
    CompletedTask,
    CompletedTaskRow,
} from '@modules/completedTasks/types';

export const completedTaskAdapter = (row: CompletedTaskRow): CompletedTask => ({
    date: moment(row.date).startOf('day'),
    taskId: row.task_id,
    userId: row.user_id,
});
