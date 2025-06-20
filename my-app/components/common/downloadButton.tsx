'use client';

import { PDFDocument, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver';

interface DownloadButtonProps {
  fileName: string;
  content: string;
}

export function DownloadButton({ fileName, content }: DownloadButtonProps) {
  const downloadPdf = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // A4
    const fontBytes = await fetch('/fonts/Symbola.ttf').then(r => r.arrayBuffer());
    const customFont = await pdfDoc.embedFont(fontBytes);
    const fontSize = 12, margin = 50;
    const { width, height } = page.getSize();
    const maxWidth = width - margin * 2;

    const wrapText = (text: string) => {
      const words = text.split(/\s+/);
      const lines: string[] = [];
      let line = '';
      for (const w of words) {
        const test = line ? `${line} ${w}` : w;
        if (customFont.widthOfTextAtSize(test, fontSize) < maxWidth) line = test;
        else { lines.push(line); line = w; }
      }
      if (line) lines.push(line);
      return lines;
    };

    let y = height - margin;
    for (const line of wrapText(content)) {
      if (y < margin) y = page.height - margin;
      page.drawText(line, { x: margin, y, size: fontSize, font: customFont, color: rgb(0, 0, 0) });
      y -= fontSize + 4;
    }

    const blob = new Blob([await pdfDoc.save()], { type: 'application/pdf' });
    saveAs(blob, `${fileName}-summary.pdf`);
  };

  return (
    <button
      onClick={downloadPdf}
      className="mt-4 px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
    >
      Download PDF
    </button>
  );
}
