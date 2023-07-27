import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import {serverErrorResponse, successResponse} from '../api.ts';
import {CompletedTaskInsert, getSupabaseClient, insert} from '../db.ts';
import {getChatCompletion, getOpenAIClient} from '../openai.ts';

interface PetTaskInfo {
    petNatures: string[];
    petFriendliness: number;
    taskTitle: string;
}

const getPromptMessage = ({petNatures, petFriendliness, taskTitle}: PetTaskInfo): string => (
    `You are a virtual pet with the following natures: ${petNatures}. `
        + `On a scale of 1-10, your friendliness rating is ${petFriendliness}. 10 is most friendly.`
        + `Your owner just completed a task: "${taskTitle}". Please reply as succinctly as possible, based on your nature and friendliness.`
);

serve(async (req: Request) => {
  const request = (await req.json()) as {row: CompletedTaskInsert, info: PetTaskInfo};

  console.log(`request=${JSON.stringify(request)}`);

  const supabaseClient = getSupabaseClient(req);

  const {data: taskRow, error: dbError} = await insert(
      supabaseClient,
      'completed_tasks',
      request.row,
  );

  if (dbError || !taskRow) {
    return serverErrorResponse(dbError, 'call insertCompletedTask');
  }

  const openAIClient = getOpenAIClient();

  const {data: response, error: gptError} = await getChatCompletion(
      openAIClient, [{
        content: getPromptMessage(request.info),
        role: 'user',
      }]);

  if (gptError || !response) {
    return serverErrorResponse(gptError, 'call getChatCompletion');
  }

  console.log(`response=${JSON.stringify(response)}`);

  return successResponse({ content: response.content });
});
