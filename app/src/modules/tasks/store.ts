import * as Burnt from 'burnt';
import { create } from 'zustand';
import type { Pet } from '@modules/pets/types';
import type { Task, TaskDifficulty, TaskRow } from '@modules/tasks/types';
import type moment from 'moment';
import { errorAlert } from '@/alerts';
import { getDateKey, reduce } from '@/utils';
import { completeTask } from '@modules/completedTasks/api';
import { taskAdapter } from '@modules/tasks/adapters';
import { fetchDailyTasksForUser, fetchSpecialTasksForUserOnDate, insertTask } from '@modules/tasks/api';
import { TaskType } from '@modules/tasks/types';

interface TasksStoreStateData {
    creating: boolean;
    tasks: Record<string, Task>;
    taskDialog: { open: boolean };
    activeTaskTab: TaskType;
}

interface TasksStoreStateFunctions {
    fetchDailyTasks: (userId: string) => Promise<string[]>;
    fetchSpecialTasks: (userId: string, date: moment.Moment) => Promise<string[]>;
    createTask: (
        userId: string,
        currentDate: moment.Moment,
        type: TaskType,
        title: string,
        difficulty: TaskDifficulty
    ) => Promise<boolean>;
    completeTask: (userId: string, task: Task, currentDateKey: string, pet: Pet) => void;
    getTask: (taskId: string) => Task;
    upsertTask: (taskRow: TaskRow) => void;
    setActiveTaskTab: (activeTaskTab: TaskType) => void;
    openTaskDialog: () => void;
    closeTaskDialog: () => void;
}

type TasksStoreState = TasksStoreStateData & TasksStoreStateFunctions;

const DEFAULT_DATA: TasksStoreStateData = {
    creating: false,
    tasks: {},
    taskDialog: { open: false },
    activeTaskTab: TaskType.DAILY,
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

    fetchSpecialTasks: async (userId: string, date: moment.Moment): Promise<string[]> => {
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
        userId: string,
        currentDate: moment.Moment,
        type: TaskType,
        title: string,
        difficulty: TaskDifficulty
    ): Promise<boolean> => {
        set({ creating: true });

        try {
            await insertTask({
                type,
                title,
                difficulty,
                user_id: userId,
                date_key: getDateKey(currentDate),
                emoji: 'TODO',
            });
            Burnt.toast({
                title: `Added a new ${type} task!`,
                preset: 'done',
                haptic: 'success',
                duration: 2,
            });
            if (type !== get().activeTaskTab) {
                set({ activeTaskTab: type });
            }
            return true;
        } catch (e) {
            errorAlert('Oops! Something went wrong...', JSON.stringify(e));
            return false;
        } finally {
            set({ creating: false });
        }
    },

    completeTask: async (userId: string, task: Task, currentDateKey: string, pet: Pet) => {
        try {
            const row = { user_id: userId, task_id: task.id, date_key: currentDateKey };
            const petTaskInfo = { petNatures: pet.natures, petFriendliness: pet.friendliness, taskTitle: task.title };
            console.log(
                `[tasksStore][completeTask] row=${JSON.stringify(row)}, petTaskInfo=${JSON.stringify(petTaskInfo)}`
            );
            const response = await completeTask(row, petTaskInfo);
            console.log(`[tasksStore][completeTask] response=${response}`);
        } catch (e) {
            errorAlert('Oops! Something went wrong...', JSON.stringify(e));
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

    setActiveTaskTab: (activeTaskTab: TaskType) => {
        if (activeTaskTab === get().activeTaskTab) {
            return;
        }
        console.log(`[taskStore][setActiveTaskTab] activeTaskTab=${activeTaskTab}`);
        set({ activeTaskTab });
    },

    openTaskDialog: () => {
        set({ taskDialog: { open: true } });
    },

    closeTaskDialog: () => {
        set({ taskDialog: { open: false } });
    },
}));

export default useTasksStore;
