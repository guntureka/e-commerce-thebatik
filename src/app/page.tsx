import { getAllCategories } from "@/actions/category";
import { getAllProducts } from "@/actions/product";
import AllProducts from "@/components/homepage/all-product";
import Banner from "@/components/homepage/banner";
import CategoryComponent from "@/components/homepage/category";
import FlashSale from "@/components/homepage/flash-sale";

export default async function Home() {
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
  ]);
  return (
    <main className="flex min-h-screen flex-col lg:px-24 px-10 py-10">
      <Banner categories={categories} />
      <CategoryComponent categories={categories} />
      <FlashSale products={products} />
      <AllProducts products={products} />
    </main>
  );
}
