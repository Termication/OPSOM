'use client';

import UploadFormInput from "./upload-form-input";
import { z } from "zod";
import { useRef, useState } from "react";
import { useUploadThing } from '@/utils/uploadthing';
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { generatePdfSummary, storePdfSummary } from "@/actions/upload-actions";

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
  const router = useRouter();
  let toastId = "";

  const { startUpload } = useUploadThing('pdfUploader', {
    onUploadBegin: () => {
      toastId = toast.loading("Uploading file...");
    },
    onClientUploadComplete: () => {
      toast.dismiss(toastId);
      toast.success("Upload Completed!", {
        duration: 5000,
      });

      setTimeout(() => {
        toast("⏳ Processing your PDF...\nPlease wait while we summarize your document.", {
          duration: 5000,
        });
      }, 1000);
    },
    onUploadError: () => {
      toast.dismiss(toastId);
      toast.error("❌ Upload failed. Ensure it's a valid PDF under 20MB.");
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    if (!file || !(file instanceof File)) {
      toast.error("❌ No file selected or invalid file.");
      setIsSubmitting(false);
      return;
    }

    const validatedFields = schema.safeParse({ file });
    if (!validatedFields.success) {
      const message = validatedFields.error.flatten().fieldErrors.file?.[0] ?? "Invalid file.";
      toast.error(message);
      setIsSubmitting(false);
      return;
    }

    const res = await startUpload([file]);
    if (!res) {
      toast.error("❌ Upload failed unexpectedly.");
      setIsSubmitting(false);
      return;
    }

    const summary = await generatePdfSummary(res);
    const { data = null, message = null } = summary || {};

    if (!data) {
      toast.error(`❌ Error generating summary. ${message ?? ""}`);
      setIsSubmitting(false);
      return;
    }


    if (data.summary) {
      const storeResult = await storePdfSummary({
        filename: file.name,
        fileUrl: res[0].serverData.fileUrl,
        summary: data.summary,
      });

      toast.success("📄 Summary stored successfully!");

      formRef.current?.reset();

      if (storeResult?.data && "id" in storeResult.data) {
        const summaryId = storeResult.data.id as string;
        router.push(`/summary/${summaryId}`);
      }

    }

    setIsSubmitting(false);
  };

  return (
    <section>
      <UploadFormInput
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        formRef={formRef}
      />
    </section>
  );
}
