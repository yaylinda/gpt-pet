import moment from 'moment';
import type { Database } from '@/gen';
import type { User } from '@modules/users/types';

export const userAdapter = (
    row: Database['public']['Tables']['users']['Row']
): User => {
    return {
        id: row.id,
        createdAt: moment(row.created_at),
        displayName: row.display_name || '',
        hasRegistered: row.has_registered,
    };
};
