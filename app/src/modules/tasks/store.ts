import { produce } from 'immer';
import { create } from 'zustand';
import type { Task, TaskRow } from '@modules/tasks/types';
import { reduce } from '@/utils';
import { taskAdapter } from '@modules/tasks/adapters';
import { fetchTasksForUser } from '@modules/tasks/api';
import { TASK_TYPE_FIELD } from '@modules/tasks/constants';
import { TaskType } from '@modules/tasks/types';

interface TasksStoreStateData {
    loadingTasks: boolean;
    dailyTasks: Record<string, Task>;
    specialTasks: Record<string, Task>;
}

interface TasksStoreStateFunctions {
    fetchTasks: (userId: string) => void;
    upsertTask: (taskRow: TaskRow) => void;
}

type TasksStoreState = TasksStoreStateData & TasksStoreStateFunctions;

const DEFAULT_DATA: TasksStoreStateData = {
    loadingTasks: false,
    dailyTasks: {},
    specialTasks: {},
};

const useTasksStore = create<TasksStoreState>()((set) => ({
    ...DEFAULT_DATA,

    fetchTasks: async (userId: string) => {
        set({ loadingTasks: true });
        const tasks = await fetchTasksForUser(userId);

        const daily = tasks.filter((t) => t.type === TaskType.DAILY);
        const special = tasks.filter((t) => t.type === TaskType.SPECIAL);

        set({
            loadingTasks: false,
            dailyTasks: reduce(daily),
            specialTasks: reduce(special),
        });
    },

    upsertTask: (taskRow: TaskRow) => {
        console.log('[tasksStore][upsertTask] taskRow update');

        set((state) => {
            const task = taskAdapter(taskRow);
            const typeField = TASK_TYPE_FIELD[task.type];
            return {
                [typeField]: produce(state[typeField], (draft) => {
                    draft[task.id] = task;
                }),
            };
        });
    },
}));

export default useTasksStore;
