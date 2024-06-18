import { ListBucketsCommand, S3Client } from "@aws-sdk/client-s3";

export const client = new S3Client({
  forcePathStyle: true,
  region: process.env.SUPABASE_STORAGE_REGION,
  endpoint: process.env.SUPABASE_STORAGE_ENDPOINT,
  credentials: {
    accessKeyId: process.env.SUPABASE_STORAGE_ACCESS_ID!,
    secretAccessKey: process.env.SUPABASE_STORAGE_ACCESS_SECRET!,
  },
});
