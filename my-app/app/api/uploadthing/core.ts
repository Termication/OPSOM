import { currentUser } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "32MB" } })
    .middleware(async ({ req }) => {
      const user = await currentUser();

      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ file, metadata }) => {
      console.log("Upload complete! Metadata:", metadata.userId);
      
      console.log("File URL:", file.url);
      return {
        userId: metadata.userId,
        fileUrl: file.url,
        fileName: file.name, };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
