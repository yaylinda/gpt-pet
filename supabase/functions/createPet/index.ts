import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import {serverErrorResponse, successResponse} from '../api.ts';
import {getSupabaseClient, insert, PetInsert} from '../db.ts';
import {getChatCompletion, getOpenAIClient} from '../openai.ts';

const getPromptMessage = (natures: string[]): string => (
    'Given the following adjectives, rate each one on a scale of 1-10, where 10 is the most desirable trait for a virtual pet, and 1 is the least.'
        + `Only respond with comma-separated numbers. ${natures}`
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

  const values = response.content!.split(',').map(x => parseInt(x));
  const score = Math.floor(values.reduce((prev, curr) => prev + curr, 0) / values.length);

  const supabaseClient = getSupabaseClient(req);

  const {data: taskRow, error: dbError} = await insert(
      supabaseClient,
      'pets',
      {...request, friendliness: score}
  );

  if (dbError || !taskRow) {
    return serverErrorResponse(dbError, 'call insertPet');
  }

  return successResponse(taskRow);
});
