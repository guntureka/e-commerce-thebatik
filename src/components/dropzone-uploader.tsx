"use client";

import { UploadDropzone } from "@/utils/uploadthing";
import React from "react";

const DropzonseUploader = () => {
  return (
    <UploadDropzone
      config={{
        mode: "auto",
      }}
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        // Do something with the response
        console.log("Files: ", res);
        alert("Upload Completed");
      }}
      onUploadError={(error: Error) => {
        alert(`ERROR! ${error.message}`);
      }}
      onUploadBegin={(name) => {
        // Do something once upload begins
        console.log("Uploading: ", name);
      }}
      onDrop={(acceptedFiles) => {
        // Do something with the accepted files
        console.log("Accepted files: ", acceptedFiles);
      }}
    />
  );
};

export default DropzonseUploader;
