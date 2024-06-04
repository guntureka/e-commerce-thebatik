import { signupAuth } from "@/actions/auth";
import { signupSchema } from "@/lib/schemas";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  // const formData = req.body;

  const parsedData = {
    email: formData.get("email")?.toString() ?? "",
    password: formData.get("password")?.toString() ?? "",
    confirmPassword: formData.get("confirmPassword")?.toString() ?? "",
    firstName: formData.get("firstName")?.toString() ?? "",
    lastName: formData.get("lastName")?.toString() ?? "",
  };

  const res = await signupAuth(parsedData);

  return NextResponse.json(res);
  // return NextResponse.json(formData.get("firstName"));
};
