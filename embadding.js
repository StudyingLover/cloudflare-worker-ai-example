import { Ai } from './vendor/@cloudflare/ai.js';

export default {
  async fetch(request, env) {
    const tasks = [];
    const ai = new Ai(env.AI);

    const requestBody = await request.json();

    const input = {
      text: requestBody.text
    };

    const response = await ai.run('@cf/baai/bge-base-en-v1.5', input);

    tasks.push({ inputs:response });

    return Response.json(tasks);
  },
};