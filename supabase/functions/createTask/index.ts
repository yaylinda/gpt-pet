import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import {serverErrorResponse, successResponse} from '../api.ts';
import {getSupabaseClient, insert, TaskInsert} from '../db.ts';
import {getChatCompletion, getOpenAIClient} from '../openai.ts';

const getPromptMessage = (task: string): string => (
    `Please respond with the most relevant emoji for this task: ${task}`
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

    const emoji = response.content.length !== 1 ? '🚫' : response.content;

    const supabaseClient = getSupabaseClient(req);

    const {data: taskRow, error: dbError} = await insert(
        supabaseClient,
        'tasks',
        {...request, emoji}
    );

    if (dbError || !taskRow) {
        return serverErrorResponse(dbError, 'call insertTask');
    }

    return successResponse(taskRow);
});
