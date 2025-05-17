import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export async function extractTextFromPdf(fileUrl: string){
    const response = await fetch(fileUrl);
    if (!response.ok) {
        throw new Error("Failed to fetch PDF");
    }
    const pdfBlob = await response.blob();
    
    const pdfArrayBuffer = await pdfBlob.arrayBuffer();

    const loader = new PDFLoader(new Blob([pdfArrayBuffer]));

    const docs = await loader.load();

    return docs.map(doc => doc.pageContent).join("\n");

}