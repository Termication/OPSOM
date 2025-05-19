'use server'

import { extractTextFromPdf } from "@/lib/langchain";
import type { ClientUploadedFileData } from "uploadthing/types";
import { generateFromOpenAI } from "@/lib/openai";

export async function generatePdfSummary(uploadResponse: ClientUploadedFileData<{
  userId: string;
  fileUrl: string;
  fileName: string;
}>[]) {
  if (!uploadResponse || uploadResponse.length === 0) {
    return {
      success: false,
      message: "No upload response provided.",
      data: null,
    };
  }

  const { serverData: { userId, fileUrl, fileName } } = uploadResponse[0];

  if (!fileUrl) {
    return {
      success: false,
      message: "No PDF URL provided.",
      data: null,
    };
  }

  try {
    const pdfText = await extractTextFromPdf(fileUrl);

    let summary;
    try {
      summary = await generateFromOpenAI(pdfText);
      console.log({ summary }); 
    } catch (error) {
      console.error("OpenAI error:", error);
      return {
        success: false,
        message: "Error generating summary.",
        data: null,
      };
    }

    return {
      success: true,
      message: "Summary generated.",
      data: summary,
    };

  } catch (err) {
    console.error("PDF extraction error:", err);
    return {
      success: false,
      message: "Error extracting text from PDF.",
      data: null,
    };
  }
}
