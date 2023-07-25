import moment from 'moment';
import { create } from 'zustand';
import type { Pet } from '@modules/pets/types';

interface TodayStoreStateData {
    currentDate: moment.Moment;
    pet: Pet | null;
}

interface TodayStoreStateFunctions {
    prevDay: () => void;
    nextDay: () => void;
}

type TodayStoreState = TodayStoreStateData & TodayStoreStateFunctions;

const DEFAULT_DATA: TodayStoreStateData = {
    currentDate: moment().startOf('day'),
    pet: null,
};

const useTodayStore = create<TodayStoreState>()((set) => ({
    ...DEFAULT_DATA,

    prevDay: () => {
        set((state) => ({
            currentDate: state.currentDate
                .clone()
                .subtract(1, 'day')
                .startOf('day'),
        }));
    },

    nextDay: () => {
        set((state) => ({
            currentDate: state.currentDate.clone().add(1, 'day').startOf('day'),
        }));
    },
}));

export default useTodayStore;
