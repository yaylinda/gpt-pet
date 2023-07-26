import { produce } from 'immer';
import moment from 'moment';
import { create } from 'zustand';
import type { Pet } from '@modules/pets/types';
import useStore from '@/store';
import { getDateKey } from '@/utils';
import { fetchCompletedTasksForUserOnDate } from '@modules/completedTasks/api';
import useTasksStore from '@modules/tasks/store';

interface TodayStoreStateData {
    currentDate: moment.Moment;
    pet: Pet | null;
    data: Record<string, { specialTasks: string[]; completedTasks: string[] }>;
}

interface TodayStoreStateFunctions {
    prevDay: () => void;
    nextDay: () => void;
    fetchDataForDay: () => void;
    insertSpecialTask: (dateKey: string, taskId: string) => void;
    insertCompletedTask: (dateKey: string, taskId: string) => void;
    deleteCompletedTask: (dateKey: string, taskId: string) => void;
}

type TodayStoreState = TodayStoreStateData & TodayStoreStateFunctions;

const DEFAULT_DATA: TodayStoreStateData = {
    currentDate: moment().startOf('day'),
    pet: null,
    data: {},
};

const useTodayStore = create<TodayStoreState>()((set, get) => ({
    ...DEFAULT_DATA,

    prevDay: () => {
        set((state) => ({
            currentDate: state.currentDate
                .clone()
                .subtract(1, 'day')
                .startOf('day'),
        }));
        get().fetchDataForDay();
    },

    nextDay: () => {
        set((state) => ({
            currentDate: state.currentDate.clone().add(1, 'day').startOf('day'),
        }));
        get().fetchDataForDay();
    },

    fetchDataForDay: async () => {
        const userId = useStore.getState().userId;
        const dateKey = getDateKey(get().currentDate);

        console.log(
            `[useTodayStore][fetchDataForDay] ${getDateKey(get().currentDate)}`
        );

        if (get().data[dateKey] || !userId) {
            return;
        }

        try {
            const completed = await fetchCompletedTasksForUserOnDate(
                userId,
                get().currentDate
            );
            const specialTasks = await useTasksStore
                .getState()
                .fetchSpecialTasks(userId, get().currentDate);
            set((state) => ({
                data: {
                    ...state.data,
                    [dateKey]: {
                        completedTasks: completed.map((t) => t.taskId),
                        specialTasks,
                    },
                },
            }));
        } catch (e) {
            // TODO
        } finally {
            // TODO
        }
    },

    insertSpecialTask: (dateKey: string, taskId: string) => {
        set((state) => ({
            data: produce(state.data, (draft) => {
                if (!draft[dateKey]) {
                    draft[dateKey] = { specialTasks: [], completedTasks: [] };
                }
                draft[dateKey].specialTasks.push(taskId);
            }),
        }));
    },

    insertCompletedTask: (dateKey: string, taskId: string) => {
        set((state) => ({
            data: produce(state.data, (draft) => {
                if (!draft[dateKey]) {
                    draft[dateKey] = { specialTasks: [], completedTasks: [] };
                }
                draft[dateKey].completedTasks.push(taskId);
            }),
        }));
    },

    deleteCompletedTask: (dateKey: string, taskId: string) => {
        set((state) => ({
            data: produce(state.data, (draft) => {
                if (!draft[dateKey]) {
                    draft[dateKey] = { specialTasks: [], completedTasks: [] };
                }
                draft[dateKey].completedTasks = draft[
                    dateKey
                ].completedTasks.filter((t) => t !== taskId);
            }),
        }));
    },
}));

export default useTodayStore;
