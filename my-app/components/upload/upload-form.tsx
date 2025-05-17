'use client';

import UploadFormInput from "./upload-form-input";
import { z } from "zod";
import { useUploadThing } from '@/utils/uploadthing';
import { toast } from 'sonner';

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
  let toastId: string | number | undefined;

  const { startUpload } = useUploadThing('pdfUploader', {
    onUploadBegin: (fileName) => {
      toastId = toast.loading("Uploading file...");
    },
    onClientUploadComplete: () => {
      toast.dismiss(toastId); // ❌ stop loading
      toast.success("Upload Completed!", {
        description: "Your file has been uploaded successfully.",
        duration: 5000,
      });
    },
    onUploadError: (error) => {
      toast.dismiss(toastId); // ❌ stop loading
      toast.error("Upload failed!", {
        description: "Please try again. Ensure the file is a valid PDF and under 20MB.",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    if (!file || !(file instanceof File)) {
      alert("No file selected or invalid file.");
      return;
    }

    const validatedFields = schema.safeParse({ file });

    if (!validatedFields.success) {
      const message = validatedFields.error.flatten().fieldErrors.file?.[0] ?? "Invalid file.";
      console.error("Validation failed:", message);
      alert(message);
      return;
    }

    const res = await startUpload([file]);
    if (!res) {
      console.error("Upload failed unexpectedly.");
    }
  };

  return (
    <section>
      <UploadFormInput onSubmit={handleSubmit} />
    </section>
  );
}
