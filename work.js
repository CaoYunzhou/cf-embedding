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
        if (!postData.input || !Array.isArray(postData.input) || postData.input.length === 0) {
            return new Response('Missing input', { status: 400 });
        }

        const responseData = {
            "object": "list",
            "model": "text-embedding-ada-002",
            data: [],
            usage: {
                prompt_tokens: 0,
                total_tokens: 0,
            },
        };

        for (let i = 0; i < postData.input.length; i++) {
            const input = { text: postData.input[i] };
            console.log('AI input:', input);

            const aiResponse = await ai.run('@cf/baai/bge-large-en-v1.5', input);
            console.log('AI response:', aiResponse);

            responseData.data.push({
                "object": "embedding",
                embedding: aiResponse.data[0],
                index: i,
            });

            responseData.usage.prompt_tokens += input.text.length;
            responseData.usage.total_tokens += input.text.length;
        }

        return new Response(JSON.stringify(responseData), {
            headers: { 'content-type': 'application/json' },
        });
    }
};