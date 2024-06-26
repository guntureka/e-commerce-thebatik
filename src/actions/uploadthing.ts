"use server";

import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export const deleteUTFiles = async (files: string[]) => {
  try {
    await utapi.deleteFiles(files);
  } catch (error) {
    console.log(error);
  }
};

export const uploadUTFiles = async (files: File[]) => {
  try {
    const response = await utapi.uploadFiles(files);

    return response;
  } catch (error) {
    console.log(error);
  }
};
