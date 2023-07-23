import { create } from 'zustand';
import { NUM_NATURES, PET_NATURES } from '@/constants';
import { Step } from '@modules/registration/types';

interface RegistrationStoreStateData {
    step: Step;
    displayName: string;
    selectedPet: string;
    selectedNatures: string[];
    petName: string;
}

interface RegistrationStoreStateFunctions {
    setStep: (step: Step) => void;
    setDisplayName: (value: string) => void;
    setSelectedPet: (value: string) => void;
    togglePetNature: (nature: string) => void;
    randomizePetNatures: () => void;
    setPetName: (value: string) => void;
}

type RegistrationStoreState = RegistrationStoreStateData &
    RegistrationStoreStateFunctions;

const DEFAULT_DATA: RegistrationStoreStateData = {
    step: Step.NAME,
    displayName: '',
    selectedPet: '',
    selectedNatures: [],
    petName: '',
};

const useRegistrationStore = create<RegistrationStoreState>()((set) => ({
    ...DEFAULT_DATA,

    setStep: (step: Step) => set({ step }),
    setDisplayName: (value: string) => set({ displayName: value }),
    setSelectedPet: (value: string) => set({ selectedPet: value }),
    togglePetNature: (nature: string) => {
        set((state) => {
            const isAdding = !state.selectedNatures.includes(nature);

            if (isAdding && state.selectedNatures.length === NUM_NATURES) {
                return { selectedNatures: state.selectedNatures };
            }

            if (isAdding && state.selectedNatures.length < NUM_NATURES) {
                return { selectedNatures: [...state.selectedNatures, nature] };
            }

            return {
                selectedNatures: state.selectedNatures.filter(
                    (n) => n !== nature
                ),
            };
        });
    },
    randomizePetNatures: () => {
        const natures: string[] = [];
        while (natures.length < NUM_NATURES) {
            const nature =
                PET_NATURES[Math.floor(Math.random() * PET_NATURES.length)];
            if (!natures.includes(nature)) {
                natures.push(nature);
            }
        }
        set({ selectedNatures: natures });
    },

    setPetName: (value: string) => set({ petName: value }),
}));

export default useRegistrationStore;
