import type {CompletedTaskRow} from '@modules/completedTasks/types';
import {Tables} from '@/enums';
import {supabase} from '@/supabase';
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
export const fetchCompletedTasksForUser = async (
    userId: string,
    date: string
) => {
    const { data, error } = await supabase
        .from(Tables.COMPLETED_TASKS)
        .select()
        .eq('userId', userId)
        .eq('date', date);

    if (error) {
        console.error(
            `[fetchCompletedTasksForUser] error: ${JSON.stringify(error)}`
        );
        throw error;
    }

    const completedTaskRows: CompletedTaskRow[] = data;

    return completedTaskRows.map((p) => completedTaskAdapter(p));
};
