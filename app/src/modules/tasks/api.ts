import type {TaskRow,TaskInsert} from '@modules/tasks/types';
import {Tables} from '@/enums';
import {supabase} from '@/supabase';
import {taskAdapter} from '@modules/tasks/adapters';

/**
 *
 * @param row
 */
export const insertTask = async (row: TaskInsert) => {
    const { data, error } = await supabase
        .from(Tables.TASKS)
        .insert(row)
        .select()
        .single();

    if (error) {
        console.error(`[insertTask] error: ${JSON.stringify(error)}`);
        throw error;
    }

    return taskAdapter(data);
};

/**
 *
 * @param userId
 */
export const fetchTasksForUser = async (userId: string) => {
    const { data, error } = await supabase
        .from(Tables.TASKS)
        .select()
        .eq('userId', userId);

    if (error) {
        console.error(`[fetchTasksForUser] error: ${JSON.stringify(error)}`);
        throw error;
    }

    const taskRows: TaskRow[] = data;

    return taskRows.map((p) => taskAdapter(p));
};
