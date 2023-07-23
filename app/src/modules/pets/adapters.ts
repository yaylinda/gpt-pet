import moment from 'moment';
import type { Database } from '@/gen';
import type { Pet } from '@modules/pets/types';

export const petAdapter = (
    row: Database['public']['Tables']['pets']['Row']
): Pet => ({
    id: row.id,
    type: row.type,
    natures: row.natures,
    createdAt: moment(row.created_at),
    displayName: row.display_name,
    userId: row.user_id,
});
