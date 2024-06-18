import {
  deleteFile,
  getFileURL,
  updateFile,
  uploadFile,
  uploadMultipleFile,
} from "@/lib/actions/file";
import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  //   const res = await getAllListBucket();
  //   return Response.json(res);
  const { data } = await getFileURL(
    "2024-06-12T23:51:45.336Z-ea6e92d3-de3c-4a32-a12a-d9898cd8305a",
    "publics"
  );

  return Response.json(data);
};

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const images: File | null = formData.get("images") as File;
  const data = await uploadFile(images, "publics");
  // Handle the file upload logic here
  return NextResponse.json({ data });
};

export const PUT = async (req: NextRequest) => {
  const formData = await req.formData();
  const images: File | null = formData.get("images") as File;
  const data = await updateFile(
    "c771b63a-6ba8-4ba3-830f-0924fc79d184-2019_04_01 09.53 Office Lens.jpg",
    images,
    "publics"
  );
  // Handle the file upload logic here
  return NextResponse.json(data);
};

export const DELETE = async (req: NextRequest) => {
  const bucket = "publics";
  const filename = [
    "0fe0aad8-cb39-4434-b395-9a82fe4a8176-2019_04_01 09.53 Office Lens.jpg",
    "web-final.png",
  ];

  const data = await deleteFile(filename, bucket);

  return Response.json(data);
};
