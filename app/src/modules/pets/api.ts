import type {PetRow,PetInsert} from '@modules/pets/types';
import {Tables} from '@/enums';
import {supabase} from '@/supabase';
import {petAdapter} from '@modules/pets/adapters';

/**
 *
 * @param row
 */
export const insertPet = async (row: PetInsert) => {
    const { data, error } = await supabase
        .from(Tables.PETS)
        .insert(row)
        .select()
        .single();

    if (error) {
        console.error(`[insertPet] error: ${JSON.stringify(error)}`);
        throw error;
    }

    return petAdapter(data);
};

/**
 *
 * @param userId
 */
export const fetchPetsForUser = async (userId: string) => {
    const { data, error } = await supabase
        .from(Tables.PETS)
        .select()
        .eq('userId', userId);

    if (error) {
        console.error(`[fetchPetsForUser] error: ${JSON.stringify(error)}`);
        throw error;
    }

    const petRows: PetRow[] = data;

    return petRows.map((p) => petAdapter(p));
};
