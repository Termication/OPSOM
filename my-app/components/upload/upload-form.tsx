"use client";

import UploadFormInput from "./upload-form-input";
import { z } from "zod";
import { useRef, useState } from "react";
import { useUploadThing } from "@/utils/uploadthing";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { generatePdfSummary, storePdfSummary } from "@/actions/upload-actions";

const schema = z.object({ file: z.instanceof(File)
  .refine(f => f.type === "application/pdf", { message: "Only PDFs allowed." })
  .refine(f => f.size <= 20 * 1024 * 1024, { message: "Max 20MB." }) });

interface StoreResult {
  success: boolean;
  data?: { id: string };
  message?: string;
}

export default function UploadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  let toastId: string = "";

  const { startUpload } = useUploadThing("pdfUploader", {
    onUploadBegin: () => { toastId = toast.loading("Uploading file..."); },
    onClientUploadComplete: () => {
      toast.dismiss(toastId);
      toast.success("Upload complete!");
      setTimeout(() => toast("⏳ Summarizing..."), 1000);
    },
    onUploadError: () => {
      toast.dismiss(toastId);
      toast.error("Upload failed. Ensure valid PDF under 20MB.");
    }
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    const validation = schema.safeParse({ file });
    if (!validation.success) {
      toast.error(validation.error.flatten().fieldErrors.file![0]!);
      setIsSubmitting(false);
      return;
    }

    const res = await startUpload([file]);
    if (!res) {
      toast.error("Upload failed.");
      setIsSubmitting(false);
      return;
    }

    const summaryRes = await generatePdfSummary(res);
    if (!summaryRes.data) {
      toast.error(`Error: ${summaryRes.message}`);
      setIsSubmitting(false);
      return;
    }

    const storeResult = (await storePdfSummary({
      filename: file.name,
      fileUrl: res[0].serverData.fileUrl,
      summary: summaryRes.data.summary
    })) as StoreResult;

    if (storeResult.success && storeResult.data) {
      toast.success("Summary stored successfully!");
      formRef.current?.reset();
      router.push(`/summary/${storeResult.data.id}`);
    } else {
      toast.error(storeResult.message ?? "Storage failed.");
    }

    setIsSubmitting(false);
  };

  return (
    <section>
      <UploadFormInput
        ref={formRef}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </section>
  );
}
