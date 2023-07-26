import { createClient, SupabaseClient, PostgrestError } from '@supabase/supabase-js';
import {APIResponse} from './api.ts';
import {Database} from './gen.ts';

export type TaskRow = Database['public']['Tables']['tasks']['Row'];
export type TaskInsert = Database['public']['Tables']['tasks']['Insert'];

/**
 *
 * @param req
 * @returns
 */
export const getSupabaseClient = (req: Request) =>
    createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_ANON_KEY') ?? '',
        {
            global: {
                headers: { Authorization: req.headers.get('Authorization')! },
            },
            auth: { persistSession: false },
        }
    );

/**
 *
 * @param client
 * @param input
 */
export const insertTask = async (
    client: SupabaseClient,
    input: TaskInsert
): Promise<APIResponse<TaskRow, PostgrestError>> => {

    const { data, error } = await client
        .from('tasks')
        .insert(input)
        .select()
        .single();

    if (error || !data) {
        return {
            data: null, error: error!,
        };
    }

    return {
        data: data as TaskRow, error: null,
    };
};
