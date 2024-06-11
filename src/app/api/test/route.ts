import { getAllCategories } from "@/lib/actions/category";
import { getAllUser } from "@/lib/actions/user";
import { categorySchema } from "@/lib/schemas";
import { db } from "@/utils/db";
import { NextRequest } from "next/server";

export const GET = async () => {
  const data = await getAllCategories();

  console.log("data;", data);
  return Response.json(data);
};

export const POST = async (req: NextRequest) => {
  const data = await req.json();
  const validatedFields = categorySchema.safeParse(data);

  if (!validatedFields.success) {
    return Response.json({
      error: "invalid fields",
    });
  }

  const res = validatedFields.data;

  try {
    await db.category.create({
      data: {
        name: res.name,
        description: res.description,
      },
    });

    return Response.json({
      success: "Category created successfully",
    });
  } catch (error) {
    return Response.json({
      error: "Something went wrong",
    });
  }
};

export const PUT = async (req: NextRequest) => {
  const params = req.nextUrl.searchParams;
  const id = params.get("id");
  const data = await req.json();
  const validatedFields = categorySchema.safeParse(data);

  if (!validatedFields.success) {
    return Response.json({
      error: "invalid fields",
    });
  }

  const res = validatedFields.data;

  try {
    await db.category.update({
      data: {
        name: res.name,
        description: res.description,
      },
      where: {
        id: id!,
      },
    });

    return Response.json({
      success: "Category created successfully",
    });
  } catch (error) {
    return Response.json({
      error: "Something went wrong",
    });
  }
};

export const DELETE = async (req: NextRequest) => {
  const params = req.nextUrl.searchParams;
  const id = params.get("id");
  try {
    await db.category.delete({
      where: {
        id: id!,
      },
    });

    return Response.json({
      success: "Category created successfully",
    });
  } catch (error) {
    return Response.json({
      error: "Something went wrong",
    });
  }
};
