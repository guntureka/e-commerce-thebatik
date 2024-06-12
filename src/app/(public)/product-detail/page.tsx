import Profile from "@/components/about-us/profile";
import React from "react";
import Image from "next/image";

import OurProducts from "@/components/OurProducts";
import { Button } from "@/components/ui/button";

const ProductDetailsPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center lg:p-24 p-10 gap-16">
      <div className="flex flex-row gap-16">
        <div className="w-9/12">
          <Image
            src="/profile.png"
            width={498}
            height={609}
            alt={"profile"}
            className="w-full"
          />
        </div>
        <div>
          <h2 className="text-[24px] font-semibold">
            Unique Batik Scarf Indonesian Javanese Style With Floral And
            Geometric Design – Navy Batik Scarves
          </h2>
          <div className="flex flex-row gap-2 items-center ">
            <div className="rating">
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-orange-400"
                checked
              />
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-orange-400"
              />
            </div>
            <div>
              <p>
                (150 Reviews) | <span className="text-[#00FF66]">In Stock</span>
              </p>
            </div>
          </div>
          <div className="my-6 gap-6">
            <p className="text-[24px]">Rp25.000</p>
            <p>
              Unique Batik Scarf Indonesian Javanese Style With Floral and
              Geometric Design – Navy Batik Scarves
            </p>
          </div>
          <hr />
          <div className="flex flex-row justify-between ">
            <div className="flex flex-row gap-2 items-center mt-6">
              <p>Size: </p>
              <Button className="bg-white text-black border-[1px] hover:bg-[#DB4444] hover:text-white">
                XS
              </Button>
              <Button className="bg-white text-black border-[1px] hover:bg-[#DB4444] hover:text-white">
                S
              </Button>
              <Button className="bg-white text-black border-[1px] hover:bg-[#DB4444] hover:text-white">
                M
              </Button>
              <Button className="bg-white text-black border-[1px] hover:bg-[#DB4444] hover:text-white">
                L
              </Button>
              <Button className="bg-white text-black border-[1px] hover:bg-[#DB4444] hover:text-white">
                XL
              </Button>
            </div>
            <div className="items-center mt-6">
              <Button className="bg-white text-black border-[1px] hover:bg-[#DB4444] hover:text-white">
                Love
              </Button>
            </div>
          </div>
          <div className="flex flex-row gap-4 my-6">
            <div></div>
            <div>
              <Button
                type="submit"
                variant={"destructive"}
                className={"w-[165px]"}
              >
                Buy Now
              </Button>
            </div>
          </div>
          <div className="flex flex-row items-center border-[1px] border-black py-4">
            <div className="px-4">
              <Button className="bg-white text-black border-[1px] hover:bg-[#DB4444] hover:text-white">
                XL
              </Button>
            </div>
            <div>
              <p>Free Delivery</p>
              <p>Enter your postal code for Delivery Availability</p>
            </div>
          </div>
          <div className="flex flex-row items-center border-[1px] border-black py-4">
            <div className="px-4">
              <Button className="bg-white text-black border-[1px] hover:bg-[#DB4444] hover:text-white">
                XL
              </Button>
            </div>
            <div>
              <p>Return Delivery</p>
              <p>Free 30 Days Delivery Returns. Details</p>
            </div>
          </div>
          
          
        </div>
      </div>

      <OurProducts />
    </main>
  );
};

export default ProductDetailsPage;
