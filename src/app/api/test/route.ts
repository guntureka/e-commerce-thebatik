import { createCategory, getAllCategories } from "@/lib/actions/category";
import { getAllUser } from "@/lib/actions/user";
import { categorySchema, productSchema } from "@/lib/schemas";
import { db } from "@/utils/db";
import { NextRequest } from "next/server";

async function parseFormData(formData: FormData) {
  const entries = await formData.entries();
  const data = Object.fromEntries(entries);
  return data;
}

export const GET = async () => {
  const data = await getAllCategories();

  console.log("data;", data);
  return Response.json(data);
};

export const POST = async (req: NextRequest) => {
  const datas = [
    {
      name: "Hand Stamped",
      description: "Hand Stamped",
    },
    {
      name: "Hand Written",
      description: "Hand Written",
    },
    {
      name: "Silk",
      description: "Silk",
    },
    {
      name: "Javanese",
      description: "Javanese",
    },
    {
      name: "Abstract",
      description: "Abstract",
    },
    {
      name: "Uniform Clothes",
      description: "Uniform Clothes",
    },
    {
      name: "Scarf Shawl",
      description: "Scarf Shawl",
    },
    {
      name: "Bag",
      description: "Bag",
    },
    {
      name: "Fabric",
      description: "Fabric",
    },
  ];

  let response = datas.forEach(async (v) => {
    const response = await createCategory({
      name: v.name,
      description: v.description,
    });

    return response;
  });

  return Response.json({ data: response });
};

// export const POST = async (req: NextRequest) => {
//   const formData = await req.formData();
//   const entries = formData.entries();
//   const parsedData = Object.fromEntries(entries);

//   return Response.json(parsedData)

//   const validatedFields = productSchema.safeParse(parsedData);

//   if (!validatedFields.success) {
//     return Response.json({
//       error: "invalid fields",
//     });
//   }

//   const res = validatedFields.data;

//   return Response.json({
//     res,
//   });

//   // try {
//   //   await db.category.create({
//   //     data: {
//   //       name: res.name,
//   //       description: res.description,
//   //     },
//   //   });

//   //   return Response.json({
//   //     success: "Category created successfully",
//   //   });
//   // } catch (error) {
//   //   return Response.json({
//   //     error: "Something went wrong",
//   //   });
//   // }
// };

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
