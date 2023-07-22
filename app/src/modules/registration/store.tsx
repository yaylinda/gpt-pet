import { create } from 'zustand';
import { Step } from '@modules/registration/types';

interface RegistrationStoreStateData {
    step: Step;
    displayName: string;
    selectedPet: string;
}

interface RegistrationStoreStateFunctions {
    setDisplayName: (value: string) => void;
    setSelectedPet: (value: string) => void;
    setStep: (step: Step) => void;
}

type RegistrationStoreState = RegistrationStoreStateData &
    RegistrationStoreStateFunctions;

const DEFAULT_DATA: RegistrationStoreStateData = {
    step: Step.NAME,
    displayName: '',
    selectedPet: '',
};

const useRegistrationStore = create<RegistrationStoreState>()((set) => ({
    ...DEFAULT_DATA,

    setDisplayName: (value: string) => set({ displayName: value }),
    setSelectedPet: (value: string) => set({ selectedPet: value }),
    setStep: (step: Step) => set({ step }),
}));

export default useRegistrationStore;
