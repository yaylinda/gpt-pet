import type { Database } from '@/gen';
import type moment from 'moment';

export type PetRow = Database['public']['Tables']['pets']['Row'];

export interface Pet {
    id: string;
    type: string;
    natures: string[];
    createdAt: moment.Moment;
    displayName: string;
    userId: string;
}
