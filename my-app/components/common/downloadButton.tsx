'use client';

import { useRef } from "react";
import html2pdf from "html2pdf.js";

interface DownloadButtonProps {
  fileName: string;
}

export function DownloadButton({ fileName }: DownloadButtonProps) {
  const handleDownload = () => {
    const element = document.getElementById("summary-pdf");
    if (!element) return;

    html2pdf().from(element).set({
      margin: 0.5,
      filename: `${fileName}-summary.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    }).save();
  };

  return (
    <button
      onClick={handleDownload}
      className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
    >
      Download PDF
    </button>
  );
}