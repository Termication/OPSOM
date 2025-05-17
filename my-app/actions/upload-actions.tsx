'use server'

import { extractTextFromPdf } from "@/lib/langchain";
import type { ClientUploadedFileData } from "uploadthing/types";

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
    console.log("Extracted text from PDF:", pdfText);
    return {
      success: true,
      message: "Text extracted.",
      data: pdfText,
    };
  } catch (err) {
    return {
      success: false,
      message: "Error extracting text from PDF.",
      data: null,
    };
  }
}
