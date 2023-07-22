import type { Database } from '@/db';
import type { User } from '@modules/users/types';
import { Tables } from '@/enums';
import { supabase } from '@/supabase';
import { userAdapter } from '@modules/users/adapters';

export const fetchUsers = async (userIds: string[]): Promise<User[]> => {
    const { data, error } = await supabase.from(Tables.USERS).select().in('id', userIds);

    if (error) {
        console.error(`[fetchUsers] error: ${JSON.stringify(error)}`);
        throw error;
    }

    return (data || []).map((p) => userAdapter(p as Database['public']['Tables']['users']['Row']));
};
