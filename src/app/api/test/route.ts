import { getAllCategories } from "@/lib/actions/category";
import { getAllUser } from "@/lib/actions/user";
import { categorySchema, productSchema } from "@/lib/schemas";
import { db } from "@/utils/db";
import { NextRequest } from "next/server";
import { createWishlist, deleteWishlist, updateWishlist } from "@/lib/actions/wishlist";
import { createCategory } from "@/lib/actions/category";
import { deleteCategory } from "@/lib/actions/category";
import { uploadFile } from "@/lib/actions/file";
import { createProduct } from "@/lib/actions/product";
import { createCart, deleteCart } from "@/lib/actions/cart";

const test  = async () => {
  const result = await deleteCart(
    'clxkvjxgd00082tir1f61tno9'
  )
}

test()