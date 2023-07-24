import moment from 'moment';
import type { User , UserRow } from '@modules/users/types';

export const userAdapter = (row: UserRow): User => {
    return {
        id: row.id,
        createdAt: moment(row.created_at),
        displayName: row.display_name || '',
        hasRegistered: row.has_registered,
    };
};
