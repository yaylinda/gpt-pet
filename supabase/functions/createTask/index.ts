import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import {serverErrorResponse, successResponse} from '../api.ts';
import {getSupabaseClient, insertTask, TaskInsert} from '../db.ts';
import {getChatCompletion, getOpenAIClient} from '../openai.ts';

const getPromptMessage = (task: string): string => (
    `Given this list of adjectives: [Adamant, Bashful, Bold, Brave, Calm, Careful, Docile, Gentle, Hardy, Hasty, Impish, Jolly, Lax, Lonely, Mild, Modest, Naive, Naughty, Quiet, Quirky, Rash, Relaxed, Sassy, Serious, Timid]. I\'m going to give you the description of a task. Please respond with the adjective from the above list that is best associated with the task, without quotes or any other words. The task is "${task}".`
);

serve(async (req: Request) => {
    const request = (await req.json()) as TaskInsert;

    console.log(`request=${JSON.stringify(request)}`);

    const openAIClient = getOpenAIClient();

    const {data: response, error: gptError} = await getChatCompletion(
        openAIClient, [{
            content: getPromptMessage(request.title),
            role: 'user',
        }]);

    if (gptError || !response) {
        return serverErrorResponse(gptError, 'call getChatCompletion');
    }

    console.log(`response=${JSON.stringify(response)}`);

    const supabaseClient = getSupabaseClient(req);

    const {data: taskRow, error: dbError} = await insertTask(supabaseClient, {...request, nature: response.content});

    if (dbError || !taskRow) {
        return serverErrorResponse(dbError, 'call insertTask');
    }

    return successResponse(taskRow);
});
