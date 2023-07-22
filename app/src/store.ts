import { create } from 'zustand';
import type { User } from '@modules/users/types';
import useUsersStore from '@modules/users/store';

interface StoreStateData {
    loadingSession: boolean;
    userId: string;
    currentUser: User | null;
}

interface StoreStateFunctions {
    setUserId: (userId: string) => void;
    reset: () => void;
}

interface StoreState extends StoreStateData, StoreStateFunctions {}

const DEFAULT_DATA: StoreStateData = {
    loadingSession: true,
    userId: '',
    currentUser: null,
};

const useStore = create<StoreState>()((set) => ({
    ...DEFAULT_DATA,

    setUserId: (userId: string) => {
        set({
            loadingSession: false,
            userId,
        });

        if (userId) {
            useUsersStore
                .getState()
                .fetchUsers([userId])
                .then((users) => {
                    set({ currentUser: users[userId] || null });
                });
        }
    },

    reset: () => {
        set({
            ...DEFAULT_DATA,
            loadingSession: false,
        });
    },
}));

export default useStore;
