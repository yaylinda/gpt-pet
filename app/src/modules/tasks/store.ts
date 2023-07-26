import { create } from 'zustand';
import type {
    Task,
    TaskDifficulty,
    TaskRow,
    TaskType,
} from '@modules/tasks/types';
import type moment from 'moment';
import useStore from '@/store';
import { getDateKey, reduce } from '@/utils';
import { taskAdapter } from '@modules/tasks/adapters';
import {
    fetchDailyTasksForUser,
    fetchSpecialTasksForUserOnDate,
    insertTask,
} from '@modules/tasks/api';
import useTodayStore from '@modules/today/store';

interface TasksStoreStateData {
    creating: boolean;
    tasks: Record<string, Task>;
    taskDialog: { open: boolean; type: TaskType | null };
}

interface TasksStoreStateFunctions {
    fetchDailyTasks: (userId: string) => Promise<string[]>;
    fetchSpecialTasks: (
        userId: string,
        date: moment.Moment
    ) => Promise<string[]>;
    createTask: (
        type: TaskType,
        title: string,
        difficulty: TaskDifficulty
    ) => Promise<boolean>;
    getTask: (taskId: string) => Task;
    upsertTask: (taskRow: TaskRow) => void;
    openTaskDialog: (type: TaskType) => void;
    closeTaskDialog: () => void;
}

type TasksStoreState = TasksStoreStateData & TasksStoreStateFunctions;

const DEFAULT_DATA: TasksStoreStateData = {
    creating: false,
    tasks: {},
    taskDialog: { open: false, type: null },
};

const useTasksStore = create<TasksStoreState>()((set, get) => ({
    ...DEFAULT_DATA,

    fetchDailyTasks: async (userId: string): Promise<string[]> => {
        const tasks = await fetchDailyTasksForUser(userId);

        set((state) => ({
            tasks: {
                ...state.tasks,
                ...reduce(tasks),
            },
        }));

        return tasks.map((t) => t.id);
    },

    fetchSpecialTasks: async (
        userId: string,
        date: moment.Moment
    ): Promise<string[]> => {
        const tasks = await fetchSpecialTasksForUserOnDate(userId, date);

        set((state) => ({
            tasks: {
                ...state.tasks,
                ...reduce(tasks),
            },
        }));

        return tasks.map((t) => t.id);
    },

    createTask: async (
        type: TaskType,
        title: string,
        difficulty: TaskDifficulty
    ): Promise<boolean> => {
        const userId = useStore.getState().userId;

        set({ creating: true });

        try {
            await insertTask({
                type,
                title,
                difficulty,
                user_id: userId,
                date_key: getDateKey(useTodayStore.getState().currentDate),
                nature: 'TODO',
            });
            return true;
        } catch (e) {
            return false;
        } finally {
            set({ creating: false });
        }
    },

    getTask: (taskId: string) => get().tasks[taskId],

    upsertTask: (taskRow: TaskRow) => {
        console.log('[tasksStore][upsertTask] taskRow update');

        set((state) => ({
            tasks: {
                ...state.tasks,
                [taskRow.id]: taskAdapter(taskRow),
            },
        }));
    },

    openTaskDialog: (type: TaskType) => {
        set({ taskDialog: { open: true, type: type } });
    },

    closeTaskDialog: () => {
        set({ taskDialog: { open: false, type: null } });
    },
}));

export default useTasksStore;
