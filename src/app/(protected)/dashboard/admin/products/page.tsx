import ProductTable from "@/components/admin/product/product-table";
import { getAllProducts } from "@/lib/actions/product";
import React from "react";

const Page = async () => {
  const products = await getAllProducts(); // Corrected to `products`
  return (
    <div className="flex flex-col p-5">
      <ProductTable products={products} />
    </div>
  );
};

export default Page; // Corrected the export to capitalize Page
