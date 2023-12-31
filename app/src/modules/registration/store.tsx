import * as Burnt from 'burnt';
import { create } from 'zustand';
import { errorAlert } from '@/alerts';
import { NUM_NATURES, PET_NATURES } from '@/constants';
import useStore from '@/store';
import { insertPet } from '@modules/pets/api';
import { Step } from '@modules/registration/types';
import { updateUser } from '@modules/users/api';

interface RegistrationStoreStateData {
    step: Step;
    displayName: string;
    petType: string;
    petNatures: string[];
    petName: string;
    progressUpdateUser: boolean;
    progressInsertPet: boolean;
}

interface RegistrationStoreStateFunctions {
    setStep: (step: Step) => void;
    setDisplayName: (value: string) => void;
    setPetType: (value: string) => void;
    togglePetNature: (nature: string) => void;
    randomizePetNatures: () => void;
    setPetName: (value: string) => void;
    doRegistration: () => Promise<boolean>;
}

type RegistrationStoreState = RegistrationStoreStateData &
    RegistrationStoreStateFunctions;

const DEFAULT_DATA: RegistrationStoreStateData = {
    step: Step.NAME,
    displayName: '',
    petType: '',
    petNatures: [],
    petName: '',
    progressUpdateUser: false,
    progressInsertPet: false,
};

const useRegistrationStore = create<RegistrationStoreState>()((set, get) => ({
    ...DEFAULT_DATA,

    setStep: (step: Step) => set({ step }),
    setDisplayName: (value: string) => set({ displayName: value }),
    setPetType: (value: string) => set({ petType: value }),
    togglePetNature: (nature: string) => {
        set((state) => {
            const isAdding = !state.petNatures.includes(nature);

            if (isAdding && state.petNatures.length === NUM_NATURES) {
                return { petNatures: state.petNatures };
            }

            if (isAdding && state.petNatures.length < NUM_NATURES) {
                return { petNatures: [...state.petNatures, nature] };
            }

            return {
                petNatures: state.petNatures.filter((n) => n !== nature),
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
        set({ petNatures: natures });
    },

    setPetName: (value: string) => set({ petName: value }),

    doRegistration: async (): Promise<boolean> => {
        set({ progressUpdateUser: false, progressInsertPet: false });

        const userId = useStore.getState().userId;

        if (!userId) {
            return false;
        }

        try {
            console.log(
                '[registrationStore][doRegistration] inserting pet for user'
            );
            await insertPet({
                user_id: userId,
                display_name: get().petName,
                natures: get().petNatures,
                type: get().petType,
                friendliness: 0,
            });
            set({ progressInsertPet: true });
        } catch (e) {
            Burnt.dismissAllAlerts();
            errorAlert('Oops! Something went wrong...', JSON.stringify(e));
            return false;
        }

        try {
            console.log(
                '[registrationStore][doRegistration] updating user displayName and registration status'
            );
            await updateUser(userId, {
                display_name: get().displayName,
                has_registered: true,
            });
            set({ progressUpdateUser: true });
        } catch (e) {
            Burnt.dismissAllAlerts();
            errorAlert('Oops! Something went wrong...', JSON.stringify(e));
            return false;
        }

        return true;
    },
}));

export default useRegistrationStore;
