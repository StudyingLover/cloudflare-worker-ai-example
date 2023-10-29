import { Ai } from './vendor/@cloudflare/ai.js';

export default {
  async fetch(request, env) {
    const formData = await request.json();
    const audio_link = formData.audio_link;

    const audioResponse = await fetch(
      audio_link
    );
    const blob = await audioResponse.arrayBuffer();

    const ai = new Ai(env.AI);
    const inputs = {
      audio: [...new Uint8Array(blob)]
    };
    const response = await ai.run('@cf/openai/whisper', inputs);

    return new Response(JSON.stringify(response));
  }
};