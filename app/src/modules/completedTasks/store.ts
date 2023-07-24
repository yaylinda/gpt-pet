import { produce } from 'immer';
import { create } from 'zustand';
import type { CompletedTaskRow } from '@modules/completedTasks/types';
import { fetchCompletedTasksForUser } from '@modules/completedTasks/api';

interface CompletedTasksStoreStateData {
    completedTasks: Record<string, string[]>;
}

interface CompletedTasksStoreStateFunctions {
    fetchCompletedTasks: (userId: string, date: string) => void;
    insertCompletedTask: (completedTaskRow: CompletedTaskRow) => void;
    deleteCompletedTask: (completedTaskRow: CompletedTaskRow) => void;
}

type CompletedTasksStoreState = CompletedTasksStoreStateData &
    CompletedTasksStoreStateFunctions;

const DEFAULT_DATA: CompletedTasksStoreStateData = {
    completedTasks: {},
};

const useCompletedTasksStore = create<CompletedTasksStoreState>()((set) => ({
    ...DEFAULT_DATA,

    fetchCompletedTasks: async (userId: string, date: string) => {
        const completedTasks = await fetchCompletedTasksForUser(userId, date);
        set((state) => ({
            completedTasks: produce(state.completedTasks, (draft) => {
                draft[date] = completedTasks.map((t) => t.taskId);
            }),
        }));
    },

    insertCompletedTask: (completedTaskRow: CompletedTaskRow) => {
        console.log(
            '[completedTasksStore][insertCompletedTask] completedTaskRow insert'
        );

        set((state) => ({
            completedTasks: produce(state.completedTasks, (draft) => {
                if (!draft[completedTaskRow.date]) {
                    draft[completedTaskRow.date] = [];
                }
                draft[completedTaskRow.date].push(completedTaskRow.task_id);
            }),
        }));
    },

    deleteCompletedTask: (completedTaskRow: CompletedTaskRow) => {
        console.log(
            '[completedTasksStore][deleteCompletedTask] completedTaskRow insert'
        );

        set((state) => ({
            completedTasks: produce(state.completedTasks, (draft) => {
                if (!draft[completedTaskRow.date]) {
                    draft[completedTaskRow.date] = [];
                }
                draft[completedTaskRow.date].filter(
                    (t) => t !== completedTaskRow.task_id
                );
            }),
        }));
    },
}));

export default useCompletedTasksStore;
