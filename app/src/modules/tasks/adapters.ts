import moment from 'moment';
import type { Task, TaskDifficulty, TaskRow, TaskType } from '@modules/tasks/types';

export const taskAdapter = (row: TaskRow): Task => ({
    id: row.id,
    title: row.title,
    type: row.type as TaskType,
    difficulty: row.difficulty as TaskDifficulty,
    createdAt: moment(row.created_at),
    userId: row.user_id,
    dateKey: row.date_key,
    emoji: row.emoji,
});
