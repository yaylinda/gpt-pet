import moment from 'moment';
import type { Pet, PetRow } from '@modules/pets/types';

export const petAdapter = (row: PetRow): Pet => ({
    id: row.id,
    type: row.type,
    natures: row.natures,
    createdAt: moment(row.created_at),
    displayName: row.display_name,
    userId: row.user_id,
    friendliness: row.friendliness,
});
