import type { Database } from '@/gen';
import type moment from 'moment';

export type TaskRow = Database['public']['Tables']['tasks']['Row'];
export type TaskInsert = Database['public']['Tables']['tasks']['Insert'];

export interface Task {
    id: string;
    title: string;
    type: TaskType;
    difficulty: TaskDifficulty;
    createdAt: moment.Moment;
    userId: string;
    dateKey: string;
    emoji: string;
}

export enum TaskType {
    DAILY = 'DAILY',
    SPECIAL = 'SPECIAL',
}

export enum TaskDifficulty {
    S = 'S',
    M = 'M',
    L = 'L',
}
