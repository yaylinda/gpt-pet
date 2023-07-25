import { create } from 'zustand';
import type { User, UserRow } from '@modules/users/types';
import usePetsStore from '@modules/pets/store';
import { userAdapter } from '@modules/users/adapters';
import useUsersStore from '@modules/users/store';

interface StoreStateData {
    loadingSession: boolean;
    userId: string;
    currentUser: User | null;
}

interface StoreStateFunctions {
    setUserId: (userId: string) => void;
    updateCurrentUser: (userRow: UserRow) => void;
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
                    console.log(
                        `[useStore] logged in user: ${JSON.stringify(
                            users[userId]
                        )}`
                    );
                    set({ currentUser: users[userId] || null });
                });
            usePetsStore.getState().fetchPets(userId);
        }
    },

    updateCurrentUser: (userRow: UserRow) => {
        console.log('[store][updateCurrentUser] currentUser update');
        set({ currentUser: userAdapter(userRow) });
    },

    reset: () => {
        set({
            ...DEFAULT_DATA,
            loadingSession: false,
        });
    },
}));

export default useStore;
