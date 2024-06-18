"use server";

import { client } from "@/utils/storage";
import { ListBucketsCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { createReadStream } from "fs";

export const getAllListBucket = async () => {
  const input = {};

  const command = new ListBucketsCommand(input);

  const response = await client.send(command);

  return response;
};

export const uploadFile = async (files: File | null, bucket: string) => {
  if (files) {
    const upload = new Upload({
      client: client,
      params: {
        Key: files.name,
        Bucket: bucket,
        Body: files,
      },
    });

    const data = await upload.done();

    return data;
  }

  return null;
};
