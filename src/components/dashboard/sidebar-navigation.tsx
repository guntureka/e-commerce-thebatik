"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

interface NavigationProps {
  Links: { href: string; name: string }[];
}

const SidebarNavigation = ({ Links }: NavigationProps) => {
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
