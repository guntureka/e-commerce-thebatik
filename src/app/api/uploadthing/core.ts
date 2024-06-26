import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 10 },
  }).onUploadComplete(async ({ metadata, file }) => {
    console.log(file.url);
    console.log(metadata);

    return { file: file.name };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
