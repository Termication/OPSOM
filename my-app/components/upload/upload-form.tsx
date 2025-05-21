'use client';

import UploadFormInput from "./upload-form-input";
import { z } from "zod";
import { useRef, useState } from "react";
import { useUploadThing } from '@/utils/uploadthing';
import { toast } from 'sonner';
import { generatePdfSummary } from "@/actions/upload-actions";

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

export default function UploadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  let toastId: string | number | undefined;

  const { startUpload } = useUploadThing('pdfUploader', {
    onUploadBegin: (fileName) => {
      toastId = toast.loading("Uploading file...");
    },
    onClientUploadComplete: () => {
      toast.dismiss(toastId);
      toast.success("Upload Completed!", {
        description: "Your file has been uploaded successfully.",
        duration: 5000,
      });
      setTimeout(() => {
        toast("Processing your PDF...", {
          description: "Please wait while we summarize your document.",
          duration: 10000,
        });
      }, 1000);
    },
    onUploadError: () => {
      toast.dismiss(toastId);
      toast.error("Upload failed!", {
        description: "Please try again. Ensure the file is a valid PDF and under 20MB.",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    if (!file || !(file instanceof File)) {
      alert("No file selected or invalid file.");
      setIsSubmitting(false);
      return;
    }

    const validatedFields = schema.safeParse({ file });
    if (!validatedFields.success) {
      const message = validatedFields.error.flatten().fieldErrors.file?.[0] ?? "Invalid file.";
      alert(message);
      setIsSubmitting(false);
      return;
    }

    const res = await startUpload([file]);
    if (!res) {
      toast("Upload failed unexpectedly.", { duration: 5000 });
      setIsSubmitting(false);
      return;
    }

    const summary = await generatePdfSummary(res);
    const { data = null, message = null } = summary || {};
    if (!data) {
      toast.error("Error generating summary.", { description: message });
      setIsSubmitting(false);
      return;
    } else {
      toast.success("Summary generated successfully!", {
        description: "Your PDF has been summarized.",
        duration: 5000,
      });
      formRef.current?.reset();
    }

    setIsSubmitting(false);
  };

  return (
    <section>
      <UploadFormInput onSubmit={handleSubmit} isSubmitting={isSubmitting} formRef={formRef} />
    </section>
  );
}
