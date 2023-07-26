import moment from 'moment';
import type { Task, TaskRow , TaskDifficulty, TaskType } from '@modules/tasks/types';
import { getDateKey } from '@/utils';

export const taskAdapter = (row: TaskRow): Task => ({
    id: row.id,
    title: row.title,
    type: row.type as TaskType,
    difficulty: row.difficulty as TaskDifficulty,
    createdAt: moment(row.created_at),
    userId: row.user_id,
    dateKey: getDateKey(moment(row.created_at)),
});
