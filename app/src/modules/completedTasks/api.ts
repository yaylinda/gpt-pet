import type {CompletedTaskInsert, CompletedTaskRow} from '@modules/completedTasks/types';
import type moment from 'moment';
import {SupabaseEdgeFunctions, Tables} from '@/enums';
import {supabase} from '@/supabase';
import {getDateKey} from '@/utils';
import {completedTaskAdapter} from '@modules/completedTasks/adapters';

/**
 *
 * @param row
 */
export const insertCompletedTask = async (row: CompletedTaskRow) => {
    const { data, error } = await supabase.from(Tables.COMPLETED_TASKS).insert(row).select().single();

    if (error) {
        console.error(`[insertCompletedTask] error: ${JSON.stringify(error)}`);
        throw error;
    }

    return completedTaskAdapter(data);
};

export const completeTask = async (
    row: CompletedTaskInsert,
    info: { petNatures: string[]; petFriendliness: number; taskTitle: string }
): Promise<string> => {
    const { data, error } = await supabase.functions.invoke(SupabaseEdgeFunctions.COMPLETE_TASK, {
        body: { row, info },
    });

    if (error) {
        console.error(`[completeTask] error: ${JSON.stringify(error)}`);
        throw error;
    }

    return data.content;
};

/**
 *
 * @param userId
 * @param date
 */
export const fetchCompletedTasksForUserOnDate = async (userId: string, date: moment.Moment) => {
    const { data, error } = await supabase
        .from(Tables.COMPLETED_TASKS)
        .select()
        .eq('user_id', userId)
        .eq('date_key', getDateKey(date));

    if (error) {
        console.error(`[fetchCompletedTasksForUser] error: ${JSON.stringify(error)}`);
        throw error;
    }

    const completedTaskRows: CompletedTaskRow[] = data;

    return completedTaskRows.map((p) => completedTaskAdapter(p));
};
