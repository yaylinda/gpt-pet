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
}));

export default useTodayStore;
