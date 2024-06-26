import { getAllCategories } from "@/actions/category";
import { getAllProducts } from "@/actions/product";
import AllProducts from "../components/landing-page/all-product";
import Banner from "../components/landing-page/banner";
import CategoryComponent from "../components/landing-page/category";
import FlashSale from "../components/landing-page/flash-sale";

export default async function Home() {
  const categories = await getAllCategories();
  const products = await getAllProducts();
  return (
    <main className="flex min-h-screen flex-col lg:px-24 px-10 py-10">
      <Banner categories={categories} />
      <CategoryComponent categories={categories} />
      <FlashSale products={products} />
      <AllProducts products={products} />
    </main>
  );
}
