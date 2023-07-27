import { produce } from 'immer';
import moment from 'moment';
import { create } from 'zustand';
import useStore from '@/store';
import { getDateKey } from '@/utils';
import { fetchCompletedTasksForUserOnDate } from '@modules/completedTasks/api';
import useTasksStore from '@modules/tasks/store';

interface TodayStoreStateData {
    currentDate: moment.Moment;
    endDate: moment.Moment;
    headerWeeks: number[];
    data: Record<string, { specialTasks: string[]; completedTasks: string[] }>;
}

interface TodayStoreStateFunctions {
    prevDay: () => void;
    nextDay: () => void;
    prevWeek: () => void;
    nextWeek: () => void;
    setCurrentDate: (date: moment.Moment) => void;
    onScrolledToWeek: (index: number) => void;
    fetchDataForDay: () => void;
    insertSpecialTask: (dateKey: string, taskId: string) => void;
    insertCompletedTask: (dateKey: string, taskId: string) => void;
    deleteCompletedTask: (dateKey: string, taskId: string) => void;
}

type TodayStoreState = TodayStoreStateData & TodayStoreStateFunctions;

const DEFAULT_DATA: TodayStoreStateData = {
    currentDate: moment().startOf('day'),
    endDate: moment().startOf('day').add(1, 'month'),
    headerWeeks: [
        moment().startOf('week').startOf('day').valueOf(),
        moment().startOf('week').startOf('day').add(1, 'week').valueOf(),
    ],
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

    prevWeek: () => {
        set((state) => ({
            currentDate: state.currentDate
                .clone()
                .subtract(1, 'week')
                .startOf('day'),
        }));
        get().fetchDataForDay();
    },

    nextWeek: () => {
        set((state) => ({
            currentDate: state.currentDate
                .clone()
                .add(1, 'week')
                .startOf('day'),
        }));
        get().fetchDataForDay();
    },

    setCurrentDate: (date: moment.Moment) => {
        set({ currentDate: date.clone() });
        get().fetchDataForDay();
    },

    onScrolledToWeek: (index: number) => {
        const isLastWeek = index === get().headerWeeks.length - 1;
        const weekStart = get().headerWeeks[index];

        console.log(
            `[todayStore][onScrolledToWeek] index=${index}, isLastWeek=${isLastWeek}, weekStart=${getDateKey(
                moment(weekStart)
            )}`
        );

        if (moment(weekStart).isSame(get().currentDate, 'week')) {
            console.log('[todayStore][onScrolledToWeek] same week, no update');
            return;
        }

        const increment = moment(weekStart).isAfter(get().currentDate, 'week')
            ? 1
            : -1;

        const nextWeekStart = moment(weekStart).add(1, 'week');

        const shouldAddNextWeek = nextWeekStart
            .clone()
            .isSameOrBefore(get().endDate, 'day');

        set((state) => ({
            currentDate: state.currentDate.clone().add(increment, 'week'),
            headerWeeks:
                isLastWeek && shouldAddNextWeek
                    ? [...state.headerWeeks, nextWeekStart.valueOf()]
                    : state.headerWeeks,
        }));
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
