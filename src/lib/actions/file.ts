import { supabase } from "@/utils/supabase";
import { v4 as uuidv4 } from "uuid";

/**
 * Uploads a file to the specified bucket.
 * @param file - The file to be uploaded.
 * @param bucket - The name of the bucket to upload the file to.
 * @returns The path of the uploaded file if successful, otherwise an error object.
 */
export const uploadFile = async (file: File, bucket: string) => {
  /**
   * The generated filename for the file.
   * It consists of the current date and a unique identifier.
   */
  const filename = `${new Date().toISOString()}-${uuidv4()}-${file.name}`;

  const data = await supabase.storage.from(bucket).upload(filename, file);

  return data;
};

/**
 * Uploads multiple files to a specified bucket.
 * @param files - An array of files to be uploaded.
 * @param bucket - The name of the bucket where the files will be uploaded.
 * @returns A Promise that resolves to an array of uploaded file data.
 */
export const uploadMultipleFile = async (files: File[], bucket: string) => {
  const data = files.map(async (file, index) => {
    return await uploadFile(file, bucket);
  });

  return data;
};

/**
 * Deletes a file from the specified storage bucket.
 * @param paths - The path of the file to be deleted.
 * @param bucket - The name of the storage bucket.
 * @returns A promise that resolves to the result of the deletion operation.
 */
export const deleteFile = async (paths: string[], bucket: string) => {
  const data = await supabase.storage.from(bucket).remove(paths);

  return data;
};

/**
 * Updates a file in the specified bucket using Supabase storage.
 *
 * @param path - The path of the file to be updated.
 * @param file - The new file to replace the existing file.
 * @param bucket - The name of the bucket where the file is located.
 * @returns A promise that resolves to the updated file data.
 */
export const updateFile = async (path: string, file: File, bucket: string) => {
  const data = await supabase.storage.from(bucket).update(path, file, {
    upsert: true,
  });

  return data;
};

/**
 * Retrieves the public URL of a file from a specified bucket.
 * @param path - The path of the file.
 * @param bucket - The name of the bucket.
 * @returns A Promise that resolves to the public URL of the file.
 */
export const getFileURL = async (path: string, bucket: string) => {
  const data = await supabase.storage.from(bucket).getPublicUrl(path, {
    download: false,
  });

  return data;
};

/**
 * Retrieves the URLs of multiple files from a specified bucket.
 * @param paths - An array of file paths.
 * @param bucket - The name of the bucket.
 * @returns A Promise that resolves to an array of file URLs.
 */
export const getMultipleFileURL = async (paths: string[], bucket: string) => {
  const data = paths.map(async (path, index) => {
    return await getFileURL(path, bucket);
  });

  return data;
};
