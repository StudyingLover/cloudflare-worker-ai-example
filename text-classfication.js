import { Ai } from './vendor/@cloudflare/ai.js';

export default {
  async fetch(request, env) {
    const requestBody = await request.json();
    const ai = new Ai(env.AI);
    const inputs = {
      // text: "I don't like you. I hate you",
      text: requestBody.text
    };

    const response = await ai.run(
      '@cf/huggingface/distilbert-sst-2-int8',
      inputs
    );

    return Response.json({ inputs, response });
  }
};
