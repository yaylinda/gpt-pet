import type { Database } from '@/gen';
import { Tables } from '@/enums';
import { supabase } from '@/supabase';
import { petAdapter } from '@modules/pets/adapters';

export const insertPet = async (
    row: Database['public']['Tables']['pets']['Insert']
) => {
    const { data, error } = await supabase
        .from(Tables.PETS)
        .insert(row)
        .single();

    if (error) {
        console.error(`[createPet] error: ${JSON.stringify(error)}`);
        throw error;
    }

    return petAdapter(data);
};
