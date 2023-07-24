import { produce } from 'immer';
import { create } from 'zustand';
import type { Task, TaskRow } from '@modules/tasks/types';
import { reduce } from '@/utils';
import { taskAdapter } from '@modules/tasks/adapters';
import { fetchTasksForUser } from '@modules/tasks/api';

interface TasksStoreStateData {
    tasks: Record<string, Task>;
}

interface TasksStoreStateFunctions {
    fetchTasks: (userId: string) => void;
    upsertTask: (taskRow: TaskRow) => void;
}

type TasksStoreState = TasksStoreStateData & TasksStoreStateFunctions;

const DEFAULT_DATA: TasksStoreStateData = {
    tasks: {},
};

const useTasksStore = create<TasksStoreState>()((set) => ({
    ...DEFAULT_DATA,

    fetchTasks: async (userId: string) => {
        const tasks = await fetchTasksForUser(userId);
        set({ tasks: reduce(tasks) });
    },

    upsertTask: (taskRow: TaskRow) => {
        console.log('[tasksStore][upsertTask] taskRow update');

        set((state) => ({
            tasks: produce(state.tasks, (draft) => {
                draft[taskRow.id] = taskAdapter(taskRow);
            }),
        }));
    },
}));

export default useTasksStore;
