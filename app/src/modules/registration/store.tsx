import { create } from 'zustand';

interface RegistrationStoreStateData {
    displayName: string;
}

interface RegistrationStoreStateFunctions {
    setDisplayName: (value: string) => void;
}

type RegistrationStoreState = RegistrationStoreStateData &
    RegistrationStoreStateFunctions;

const DEFAULT_DATA: RegistrationStoreStateData = {
    displayName: '',
};

const useRegistrationStore = create<RegistrationStoreState>()((set ) => ({
    ...DEFAULT_DATA,

    setDisplayName: (value: string) => set({ displayName: value }),
}));

export default useRegistrationStore;
