import { Ai } from './vendor/@cloudflare/ai.js';

export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        if (url.pathname !== '/v1/embeddings') {
            return new Response('Not Found', { status: 404 });
        }

        if (request.headers.get('Authorization') !== 'Bearer sk-123456') {
            return new Response('Unauthorized', { status: 401 });
        }

        if (request.method !== 'POST') {
            return new Response('Expected POST', { status: 405 });
        }

        const ai = new Ai(env.AI);
        const postData = await request.json();
        if (!postData.input) {
            return new Response('Missing input', { status: 400 });
        }

        const input = { text: postData.input[0] };
        console.log('AI input:', input);

        const aiResponse = await ai.run('@cf/baai/bge-base-en-v1.5', input);
        console.log('AI response:', aiResponse);

        const responseData = {
            data: [
                {
                    embedding: aiResponse.data[0],
                    index: 0,
                },
            ],
            usage: {
                prompt_tokens: input.text.length,
                total_tokens: input.text.length,
            },
        };

        return new Response(JSON.stringify(responseData), {
            headers: { 'content-type': 'application/json' },
        });
    }
};