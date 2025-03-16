import { generateText } from 'ai';
export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  const firmId = session.user.firmId;

  const { prompt = '' as string } = getQuery(event);

  try {
    const model = googleAi('gemini-2.0-flash')

    if(!prompt) {
        throw createError({ statusCode: 400, message: 'Prompt is required' });
    }
    
    const { text } = await generateText({
      model,
      prompt,
    });
    
    return {
      text,
    };
  }
  catch (error) {
    console.error("Error fetching ai:", error);
    throw createError({ statusCode: 500, message: 'Failed to fetch ai' });
  }
});