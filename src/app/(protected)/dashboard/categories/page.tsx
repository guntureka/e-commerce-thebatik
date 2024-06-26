import { getAllCategories } from "@/actions/category";
import AddCategoryForm from "@/components/dashboard/category/add-category-form";
import CategoryTable from "@/components/dashboard/category/category-table";
import React from "react";

const CategoriesPage = async () => {
  const categories = await getAllCategories();
  return (
    <div className="flex flex-col gap-4 p-4">
      <div>
        <h1 className="text-center text-4xl font-extrabold">CATEGORY</h1>
      </div>
      <div className="flex justify-end items-center">
        <AddCategoryForm />
      </div>
      <div className="overflow-auto h-96">
        <CategoryTable categories={categories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
