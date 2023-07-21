import { create } from 'zustand';

interface StoreStateData {
    loadingSession: boolean;
    userId: string;
}

interface StoreStateFunctions {
    setUserId: (userId: string) => void;
}

interface StoreState extends StoreStateData, StoreStateFunctions {}

const DEFAULT_DATA: StoreStateData = {
    loadingSession: true,
    userId: '',
};

const useStore = create<StoreState>()((set, get) => ({
    ...DEFAULT_DATA,

    setUserId: (userId: string) => {
        set({
                loadingSession: false,
                userId,
            });

        if (userId) {
            // useProfileStore.getState().fetchProfiles([userId]);
        }
    },
}));

export default useStore;
