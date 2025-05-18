import { ApiError } from "next/dist/server/api-utils";
import OpenAI from "openai";
import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";


const client = new OpenAI(
{
        apiKey: process.env.OPENAI_API_KEY,
}
);


export async function generateFromOpenAI(pdfText: string) {
  try {  
    const completion = await client.chat.completions.create({
    model: "gpt-4.1",
    messages: [
        {
            role: "system", content: SUMMARY_SYSTEM_PROMPT
        },
        {
            role: "user",
            content: "Transform the following text into a summary. it should be easy to read, catchy with contextually relevent emojis and proper markdown " + pdfText,
        },
    ],
    temperature: 0.7,
    max_tokens: 1500,
});

return completion.choices[0].message.content;
  }
    catch (error: any) {
        if (error?.status === 429) {
            throw new Error('RATE_LIMIT_EXCEEDED');
        }
        throw error;
    }
    
}