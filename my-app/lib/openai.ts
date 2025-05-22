import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";

const token = process.env["GITHUB_TOKEN"];
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";

const client = ModelClient(endpoint, new AzureKeyCredential(token));

export async function generateFromOpenAI(pdfText: string) {
  try {
    const response = await client.path("/chat/completions").post({
      body: {
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
        top_p: 1,
        model: model,
        max_tokens: 1500,
      },
    });

    if (isUnexpected(response)) {
      throw response.body.error;
    }

    return response.body.choices[0].message.content;
  } catch (error: any) {
    console.error("GitHub GPT-4.1 error details:", error);

    if (error?.status === 429) {
      throw new Error("Rate limit reached (GitHub GPT-4.1)");
    }

    throw new Error("Unexpected GPT-4.1 API error");
  }
}
