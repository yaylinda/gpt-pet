import type {TaskInsert, TaskRow} from '@modules/tasks/types';
import type moment from 'moment';
import {Tables} from '@/enums';
import {supabase} from '@/supabase';
import {getDateKey} from '@/utils';
import {taskAdapter} from '@modules/tasks/adapters';
import {TaskType} from '@modules/tasks/types';

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
export const fetchDailyTasksForUser = async (userId: string) => {
    const { data, error } = await supabase
        .from(Tables.TASKS)
        .select()
        .eq('user_id', userId)
        .eq('type', TaskType.DAILY);

    if (error) {
        console.error(
            `[fetchDailyTasksForUser] error: ${JSON.stringify(error)}`
        );
        throw error;
    }

    const taskRows: TaskRow[] = data;

    console.log(
        `[fetchDailyTasksForUser] userId=${userId}, tasks=${JSON.stringify(
            taskRows
        )}`
    );

    return taskRows.map((p) => taskAdapter(p));
};

/**
 *
 * @param userId
 * @param date
 */
export const fetchSpecialTasksForUserOnDate = async (
    userId: string,
    date: moment.Moment
) => {
    const { data, error } = await supabase
        .from(Tables.TASKS)
        .select()
        .eq('user_id', userId)
        .eq('type', TaskType.SPECIAL)
        .eq('date_key', getDateKey(date));

    if (error) {
        console.error(
            `[fetchSpecialTasksForUserOnDay] error: ${JSON.stringify(error)}`
        );
        throw error;
    }

    const taskRows: TaskRow[] = data;

    console.log(
        `[fetchSpecialTasksForUserOnDay] userId=${userId}, tasks=${JSON.stringify(
            taskRows
        )}`
    );

    return taskRows.map((p) => taskAdapter(p));
};
