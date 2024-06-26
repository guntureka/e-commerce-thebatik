import { getAllCategories } from "@/actions/category";
import { getAllProducts } from "@/actions/product";
import CategoryTable from "@/components/dashboard/category/category-table";
import AddProductForm from "@/components/dashboard/product/add-product-form";
import ProductTable from "@/components/dashboard/product/product-table";
import React from "react";

const Products = async () => {
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
  ]);
  return (
    <div className="flex flex-col gap-4 p-4">
      <div>
        <h1 className="text-center text-4xl font-extrabold">Products</h1>
      </div>
      <div className="flex justify-end items-center">
        <AddProductForm categories={categories} />
      </div>
      <div className="overflow-auto h-96">
        <ProductTable products={products} categories={categories} />
      </div>
    </div>
  );
};

export default Products;
