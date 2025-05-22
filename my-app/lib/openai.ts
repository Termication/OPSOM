import OpenAI from "openai";
import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function generateFromOpenAI(pdfText: string) {
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      messages: [
        {
          role: "system",
          content: SUMMARY_SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: `Transform the following text into a summary. Make it readable, catchy, with contextually relevant emojis and markdown:\n\n${pdfText.slice(0, 6000)}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    return completion.choices[0].message.content;
  } catch (error: any) {
    console.error("OpenAI error details:", {
      status: error?.status,
      message: error?.message,
      type: error?.type,
      detail: error?.detail,
    });

    if (error?.status === 429) {
      // ❗ throw instead of returning a message
      throw new Error("Rate limit reached");
    }

    // ❗ also throw for other unexpected errors
    throw new Error("Unexpected OpenAI error");
  }
}
