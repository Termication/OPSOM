import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";

const token = process.env["GITHUB_TOKEN"];
const endpoint = "https://models.github.ai/inference";
const model = "deepseek/DeepSeek-V3-0324";

const client = ModelClient(endpoint, new AzureKeyCredential(token));

export async function generateSummaryFromDeekseek(pdfText: string) {
  try {
    const prompt = `Transform the following text into a summary. Make it readable, catchy, with contextually relevant emojis and markdown:\n\n${pdfText.slice(0, 6000)}`;

    const response = await client.path("/chat/completions").post({
      body: {
        messages: [
          { role: "system", content: SUMMARY_SYSTEM_PROMPT },
          { role: "user", content: prompt },
        ],
        temperature: 0.8,
        top_p: 0.1,
        max_tokens: 1500,
        model: model,
      },
    });

    if (isUnexpected(response)) {
      throw response.body.error;
    }

    return response.body.choices[0].message.content;

  } catch (error: any) {
    console.error("DeepSeek error details:", {
      message: error?.message,
      status: error?.status,
      stack: error?.stack,
    });

    if (error?.status === 429) {
      return "⚠️ DeepSeek rate limit exceeded. Please try again soon.";
    }

    return "❌ An unexpected error occurred while using DeepSeek.";
  }
}
