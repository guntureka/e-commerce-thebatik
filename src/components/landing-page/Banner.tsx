import Icon from "react-icons-kit";
import { chevronRight } from "react-icons-kit/fa/chevronRight";
import Link from "next/link";
import Image from "next/image";
import { Category } from "@prisma/client";

interface BannerProps {
  categories: Category[] | undefined;
}

export default function Banner({ categories }: BannerProps) {
  return (
    <div className="flex w-full justify-between items-center gap-5">
      <div className="w-80">
        <ul>
          {categories &&
            categories.map((category, index) => (
              <Link href={`/product/category/${category.slug}`} key={index}>
                <li className="mb-4 flex justify-between items-center">
                  <span>{category.name}</span>
                </li>
              </Link>
            ))}
        </ul>
      </div>
      <div className="w-full h-80 md:flex hidden ">
        <Image
          src="/seragam-batik-ugm-senior-choir.jpg"
          alt=""
          height={1000}
          width={1000}
          className="h-full object-cover w-full"
        />
      </div>
    </div>
  );
}
