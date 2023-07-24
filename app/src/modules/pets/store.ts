import { produce } from 'immer';
import { create } from 'zustand';
import type { Pet, PetRow } from '@modules/pets/types';
import { petAdapter } from '@modules/pets/adapters';
import { fetchPetsForUser } from '@modules/pets/api';

interface PetsStoreStateData {
    pets: Pet[];
}

interface PetsStoreStateFunctions {
    fetchPets: (userId: string) => void;
    upsertPet: (petRow: PetRow) => void;
}

type PetsStoreState = PetsStoreStateData & PetsStoreStateFunctions;

const DEFAULT_DATA: PetsStoreStateData = {
    pets: [],
};

const usePetsStore = create<PetsStoreState>()((set) => ({
    ...DEFAULT_DATA,

    fetchPets: async (userId: string) => {
        const pets = await fetchPetsForUser(userId);
        set({ pets });
    },

    upsertPet: (petRow: PetRow) => {
        console.log('[petsStore][upsertPet] petRow update');

        set((state) => ({
            pets: produce(state.pets, (draft) => {
                const indexToUpdate = draft.findIndex(
                    (p) => p.id === petRow.id
                );

                if (indexToUpdate > -1) {
                    draft[indexToUpdate] = petAdapter(petRow);
                }
            }),
        }));
    },
}));

export default usePetsStore;
