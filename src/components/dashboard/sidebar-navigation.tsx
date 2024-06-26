"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const Links = [
  {
    href: "/dashboard",
    name: "Dashboard",
  },
  {
    href: "/dashboard/categories",
    name: "Categories",
  },
  {
    href: "/dashboard/products",
    name: "Products",
  },
  {
    href: "/dashboard/users",
    name: "Users",
  },
  {
    href: "/dashboard/transactions",
    name: "Transactions",
  },
];

const SidebarNavigation = () => {
  return (
    <div className="flex flex-col w-full gap-3 p-4 justify-center items-center">
      {Links.map((link, index) => (
        <Link href={link.href} className="w-full" key={index}>
          <Button className="w-full flex justify-start">{link.name}</Button>
        </Link>
      ))}
    </div>
  );
};

export default SidebarNavigation;
