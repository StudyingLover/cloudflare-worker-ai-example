import { Ai } from './vendor/@cloudflare/ai.js';

export default {
  async fetch(request, env) {
    const ai = new Ai(env.AI);
    const requestBody = await request.json();
    const inputs = {
      text: requestBody.text,
      source_lang: requestBody.source_lang,
      target_lang: requestBody.target_lang
    };
    const response = await ai.run('@cf/meta/m2m100-1.2b', inputs);

    return Response.json({ inputs, response });
  }
};
