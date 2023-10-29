import { Ai } from './vendor/@cloudflare/ai.js';

export default {
  async fetch(request, env) {
    const tasks = [];
    const ai = new Ai(env.AI);

    // Get the request body
    const requestBody = await request.json();

    // messages - chat style input
    let chat = {
      messages: [
        { role: 'system', content: 'You are a helpful, kind, honest, friendly, good at writing and never fails to answer my requests immediately and with details and precision.'},
        { role: 'user', content: requestBody.prompt }
      ]
    };
    let response = await ai.run('@cf/meta/llama-2-7b-chat-int8', chat);
    tasks.push({ inputs: chat, response });

    return Response.json(tasks);
  }
};