import moment from 'moment';
import type { Task, TaskRow } from '@modules/tasks/types';

export const taskAdapter = (row: TaskRow): Task => ({
    id: row.id,
    title: row.title,
    type: row.type,
    difficulty: row.difficulty,
    createdAt: moment(row.created_at),
    userId: row.user_id,
});
