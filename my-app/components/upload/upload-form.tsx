'use client';

import { on } from "events";
import UploadFormInput from "./upload-form-input";
import { z } from "zod";
import { useUploadThing } from '@/utils/uploadthing';

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


const default function UploadForm() {
  const { startUpload, routeConfig } = useUploadThing
  ('myUploadthingEndpoint', {
    onClientUploadComplete: () => {
      alert("Upload Completed!");
    },
    onUploadError: () => {
      alert('Upload failed!');
    },
    onLoadbegin: ({ file }) => {
      console.log("Upload started!", file);
    },
  })
}


export default function UploadHeader() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    if (!file || !(file instanceof File)) {
      alert("No file selected or invalid file.");
      return;
    }

    const validatedFields = schema.safeParse({ file });

    console.log(validatedFields);

    if (!validatedFields.success) {
        console.log(validatedFields.error.flatten().fieldErrors.file?.[0] ?? "Invalid file.");

    };

    if (validatedFields.success) {
  // console.log("File uploaded:", file.name);
}


    // console.log("File uploaded:", file.name);
  };

  return (
    <section>
      <UploadFormInput onSubmit={handleSubmit} />
    </section>
  );
}
