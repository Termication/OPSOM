'use server'

import { extractTextFromPdf } from "@/lib/langchain";

export async function generatePdfSummary(uploadRespose: [{
    serverData: {
        userId: string;
        file: {
            url: string;
            name: string;
        };
    };
}]) {
    if (!uploadRespose) {
        return {
            success: false,
            message: "No upload response provided.",
            data: null,
        };
    }

    const { serverData: 
        userId,
        file: { url: pdfUrl, name: fileName },
     } = uploadRespose[0];

     if(!pdfUrl){
        return {
            success: false,
            message: "No PDF URL provided.",
            data: null,
        };
     }

     try {
        const pdfText = await extractTextFromPdf(pdfUrl);
        console.log("Extracted text from PDF:", pdfText);
     } catch (err) {
        return {
            success: false,
            message: "Error extracting text from PDF.",
            data: null,
        }
    }
}