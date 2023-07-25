import { TaskType } from '@modules/tasks/types';

export const TASK_TYPE_FIELD: Record<TaskType, 'dailyTasks' | 'specialTasks'> =
    {
        [TaskType.DAILY]: 'dailyTasks',
        [TaskType.SPECIAL]: 'specialTasks',
    };
