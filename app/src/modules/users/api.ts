import type {Database} from '@/gen';
import type {User} from '@modules/users/types';
import {Tables} from '@/enums';
import {supabase} from '@/supabase';
import {userAdapter} from '@modules/users/adapters';

/**
 *
 * @param userIds
 */
export const fetchUsers = async (userIds: string[]): Promise<User[]> => {
    const { data, error } = await supabase
        .from(Tables.USERS)
        .select()
        .in('id', userIds);

    if (error) {
        console.error(`[fetchUsers] error: ${JSON.stringify(error)}`);
        throw error;
    }

    return (data || []).map((p) =>
        userAdapter(p as Database['public']['Tables']['users']['Row'])
    );
};

/**
 *
 * @param userId
 * @param update
 */
export const updateUser = async (
    userId: string,
    update: Database['public']['Tables']['users']['Update']
): Promise<User> => {
    const { data, error } = await supabase
        .from(Tables.USERS)
        .update(update)
        .eq('id', userId)
        .single();

    if (error) {
        console.error(`[updateUser] error: ${JSON.stringify(error)}`);
        throw error;
    }

    return userAdapter(data as Database['public']['Tables']['users']['Row']);
};
