import { ApiError } from "next/dist/server/api-utils";
import OpenAI from "openai";
const client = new OpenAI(
{
        apiKey: process.env.OPENAI_API_KEY,
}
);

const completion = await client.chat.completions.create({
    model: "gpt-4.1",
    messages: [
        {
            role: "system",
            content: "",
        },
    ],
    temperature: 0.7,
    max_tokens: 1500,
});

console.log(completion.choices[0].message.content);