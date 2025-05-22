import { GoogleGenerativeAI } from "@google/generative-ai";
import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateSummaryFromGemini(pdfText: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // Latest stable

    const prompt = `${SUMMARY_SYSTEM_PROMPT}\n\nTransform the following text into a summary. Make it readable, catchy, with contextually relevant emojis and markdown:\n\n${pdfText.slice(0, 6000)}`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1500,
      },
    });

    const response = result.response;
    return response.text();

  } catch (error: any) {
    console.error("Gemini error details:", {
      message: error?.message,
      name: error?.name,
      stack: error?.stack,
    });

    if (error?.message?.includes("Quota") || error?.message?.includes("429")) {
      return "⚠️ Gemini rate limit exceeded. Please try again soon.";
    }

    return "❌ An unexpected error occurred while using Gemini.";
  }
}
