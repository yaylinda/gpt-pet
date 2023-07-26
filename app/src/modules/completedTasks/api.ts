import type {CompletedTaskRow} from '@modules/completedTasks/types';
import type moment from 'moment';
import {Tables} from '@/enums';
import {supabase} from '@/supabase';
import {getDateKey} from '@/utils';
import {completedTaskAdapter} from '@modules/completedTasks/adapters';

/**
 *
 * @param row
 */
export const insertCompletedTask = async (row: CompletedTaskRow) => {
    const { data, error } = await supabase
        .from(Tables.COMPLETED_TASKS)
        .insert(row)
        .select()
        .single();

    if (error) {
        console.error(`[insertCompletedTask] error: ${JSON.stringify(error)}`);
        throw error;
    }

    return completedTaskAdapter(data);
};

/**
 *
 * @param userId
 * @param date
 */
export const fetchCompletedTasksForUserOnDate = async (
    userId: string,
    date: moment.Moment
) => {
    const { data, error } = await supabase
        .from(Tables.COMPLETED_TASKS)
        .select()
        .eq('user_id', userId)
        .eq('date_key', getDateKey(date));

    if (error) {
        console.error(
            `[fetchCompletedTasksForUser] error: ${JSON.stringify(error)}`
        );
        throw error;
    }

    const completedTaskRows: CompletedTaskRow[] = data;

    return completedTaskRows.map((p) => completedTaskAdapter(p));
};
