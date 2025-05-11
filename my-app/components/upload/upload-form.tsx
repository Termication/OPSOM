'use client';

import UploadFormInput from "./upload-form-input";
import { z } from "zod";

const schema = z.object({
    file: z
        .instanceof(File, { message: "Invalid file." })
        .refine((file) => file.type === "application/pdf", {
            message: "Only PDF files are allowed.",
        })
        .refine((file) => file.size <= 20 * 1024 * 1024, {
            message: "File size must be less than 20MB.",
        }),
});


export default function UploadHeader() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    if (!file || !(file instanceof File)) {
      alert("No file selected or invalid file.");
      return;
    }

    console.log("File uploaded:", file.name);
  };

  return (
    <section>
      <UploadFormInput onSubmit={handleSubmit} />
    </section>
  );
}
