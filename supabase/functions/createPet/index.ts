import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import {serverErrorResponse, successResponse} from '../api.ts';
import {getSupabaseClient, insert, PetInsert} from '../db.ts';
import {getChatCompletion, getOpenAIClient} from '../openai.ts';

const getPromptMessage = (natures: string[]): string => (
    `You are a virtual pet with the following natures: ${natures}. On a scale of 1-10, how would you rate the friendliness? 10 is most friendly. `
    + 'Only reply with the number, without quotes.'
);

serve(async (req: Request) => {
  const request = (await req.json()) as PetInsert;

  console.log(`request=${JSON.stringify(request)}`);

  const openAIClient = getOpenAIClient();

  const {data: response, error: gptError} = await getChatCompletion(
      openAIClient, [{
        content: getPromptMessage(request.natures),
        role: 'user',
      }]);

  if (gptError || !response) {
    return serverErrorResponse(gptError, 'call getChatCompletion');
  }

  console.log(`response=${JSON.stringify(response)}`);

  const supabaseClient = getSupabaseClient(req);

  const {data: taskRow, error: dbError} = await insert(
      supabaseClient,
      'pets',
      {...request, friendliness: parseInt(response.content!)}
  );

  if (dbError || !taskRow) {
    return serverErrorResponse(dbError, 'call insertPet');
  }

  return successResponse(taskRow);
});
