import { produce } from 'immer';
import { create } from 'zustand';
import type { Pet, PetRow } from '@modules/pets/types';
import type { User, UserRow } from '@modules/users/types';
import { petAdapter } from '@modules/pets/adapters';
import usePetsStore from '@modules/pets/store';
import useTasksStore from '@modules/tasks/store';
import { userAdapter } from '@modules/users/adapters';
import useUsersStore from '@modules/users/store';

interface StoreStateData {
    loadingSession: boolean;
    theme: string;
    userId: string;
    currentUser: User | null;
    currentPet: Pet | null;
    dailyTasks: string[];
}

interface StoreStateFunctions {
    setUserId: (userId: string) => void;
    updateCurrentUser: (userRow: UserRow) => void;
    updateCurrentPet: (petRow: PetRow) => void;
    getCurrentPet: () => Pet;
    insertDailyTask: (taskId: string) => void;
    setTheme: (color: string, dark?: boolean, alt?: 'alt1' | 'alt2') => void;
    reset: () => void;
}

interface StoreState extends StoreStateData, StoreStateFunctions {}

const DEFAULT_DATA: StoreStateData = {
    loadingSession: true,
    userId: '',
    currentUser: null,
    currentPet: null,
    theme: 'light_blue',
    dailyTasks: [],
};

const useStore = create<StoreState>()((set, get) => ({
    ...DEFAULT_DATA,

    setUserId: async (userId: string) => {
        set({
            loadingSession: false,
            userId,
        });

        if (!userId) {
            return;
        }

        try {
            const users = await useUsersStore.getState().fetchUsers([userId]);
            const pets = await usePetsStore.getState().fetchPets(userId);
            const dailyTasks = await useTasksStore.getState().fetchDailyTasks(userId);

            set({
                currentUser: users[userId],
                currentPet: pets[0],
                dailyTasks,
            });
        } catch (e) {
            // TODO
        } finally {
            // TODO
        }
    },

    updateCurrentUser: (userRow: UserRow) => {
        console.log('[store][updateCurrentUser] currentUser update');
        set({ currentUser: userAdapter(userRow) });
    },

    updateCurrentPet: (petRow: PetRow) => {
        console.log('[store][updateCurrentPet] currentPet update');
        set({ currentPet: petAdapter(petRow) });
    },

    getCurrentPet: () => {
        return get().currentPet!;
    },

    insertDailyTask: (taskId: string) => {
        set((state) => ({
            dailyTasks: produce(state.dailyTasks, (draft) => {
                draft.push(taskId);
            }),
        }));
    },

    setTheme: (color: string, dark = false, alt) => {
        set({
            theme: `${dark ? 'dark' : 'light'}_${color}${alt ? `_${alt}` : ''}`,
        });
    },

    reset: () => {
        set({
            ...DEFAULT_DATA,
            loadingSession: false,
        });
    },
}));

export default useStore;
