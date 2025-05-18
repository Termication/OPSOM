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
    // console.log("Extracted text from PDF:", pdfText);
    return {
      success: true,
      message: "Text extracted.",
      data: pdfText,
    };

    let summary;

    try {
      summary = await generateFromOpenAI(pdfText);
      console.log({ summary });    
    } catch (error) {
      console.error(error);
    }
    
    if (!summary){
      return {
        success: false,
        message: "Error generating summary.",
        data: null,
      };
    }

}  catch (err) {
    return {
      success: false,
      message: "Error extracting text from PDF.",
      data: null,
    };
  }
}
