import { Ai } from './vendor/@cloudflare/ai.js';

export default {
  async fetch(request, env) {
    const requestBody = await request.json();
    const imageResponse = await fetch(requestBody.image_link);
    const blob = await imageResponse.arrayBuffer();

    const ai = new Ai(env.AI);
    const inputs = {
      image: [...new Uint8Array(blob)]
    };

    const response = await ai.run('@cf/microsoft/resnet-50', inputs);
    return Response.json({ inputs: { image: [] }, response });
  }
};
