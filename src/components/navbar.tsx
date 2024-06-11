"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { type Session } from "next-auth";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface NavbarProps {
  session: Session | null;
}

export default function Navbar({ session }: NavbarProps) {
  const pathname = usePathname();
  console.log(pathname);

  const handleCart = async () => {
    console.log("cart");
  };
  const handleWishlist = async () => {
    console.log("wishlist");
  };

  return (
    <header className="sticky top-0 bg-white">
      <div className="flex justify-between items-center lg:px-24 px-10 py-5">
        <Image src="/logo-header.png" width={132} height={32} alt={"logo"} />
        <div className="hidden md:flex items-center">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-3 text-base items-center">
              <NavigationMenuItem>
                <Link href={"/"} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={`hover:underline ${
                      pathname === "/" ? "underline" : ""
                    }`}
                  >
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href={"/contact-us"} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={`hover:underline ${
                      pathname === "/contact-us" ? "underline" : ""
                    }`}
                  >
                    Contact Us
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href={"/about-us"} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={`hover:underline ${
                      pathname === "/about-us" ? "underline" : ""
                    }`}
                  >
                    About Us
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center md:gap-4 gap-2">
          <Button
            variant={null}
            className="p-0 flex items-center"
            onClick={handleWishlist}
          >
            <Image
              src={
                "https://img.icons8.com/material-outlined/24/filled-like.png"
              }
              alt="filled-like"
              width={24}
              height={24}
              priority
            />
          </Button>
          <Button
            variant={null}
            className="p-0 flex items-center"
            onClick={handleCart}
          >
            <svg
              className=" text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
              />
            </svg>
          </Button>
          <div className="flex items-center">
            {session?.user ? (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant={null} className="p-0 flex items-center">
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Button>
                </SheetTrigger>
                <SheetContent className={`py-10`}>
                  <div className="flex flex-col space-y-3">
                    <div className="flex flex-col space-y-3 md:hidden">
                      <SheetClose asChild>
                        <Link href={"/"} className="text-start">
                          <Button
                            variant={"ghost"}
                            className="w-full flex justify-start"
                          >
                            Home
                          </Button>
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link href={"/contact-us"} className="text-start">
                          <Button
                            variant={"ghost"}
                            className="w-full flex justify-start"
                          >
                            Contact Us
                          </Button>
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link href={"/about-us"} className="text-start">
                          <Button
                            variant={"ghost"}
                            className="w-full flex justify-start"
                          >
                            About Us
                          </Button>
                        </Link>
                      </SheetClose>
                    </div>
                    <SheetClose asChild>
                      <Button
                        variant={"destructive"}
                        className="w-full"
                        onClick={() => signOut()}
                      >
                        Logout
                      </Button>
                    </SheetClose>
                  </div>
                </SheetContent>
              </Sheet>
            ) : (
              <div className="flex items-center">
                <div className="hidden md:flex gap-3">
                  <Link href={"/sign-up"}>
                    <Button variant={"outline"}>Sign up</Button>
                  </Link>
                  <Link href={"/sign-in"}>
                    <Button>Sign in</Button>
                  </Link>
                </div>
                <div className="md:hidden flex items-center">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant={null} className="p-0 flex items-center">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"
                            fill="currentColor"
                          />
                        </svg>
                      </Button>
                    </SheetTrigger>
                    <SheetContent className={`py-10`}>
                      <div className="flex flex-col space-y-3">
                        <div className="flex flex-col space-y-3 md:hidden">
                          <SheetClose asChild>
                            <Link href={"/"} className="text-start">
                              <Button
                                variant={"ghost"}
                                className="w-full flex justify-start"
                              >
                                Home
                              </Button>
                            </Link>
                          </SheetClose>
                          <SheetClose asChild>
                            <Link href={"/contact-us"} className="text-start">
                              <Button
                                variant={"ghost"}
                                className="w-full flex justify-start"
                              >
                                Contact Us
                              </Button>
                            </Link>
                          </SheetClose>
                          <SheetClose asChild>
                            <Link href={"/about-us"} className="text-start">
                              <Button
                                variant={"ghost"}
                                className="w-full flex justify-start"
                              >
                                About Us
                              </Button>
                            </Link>
                          </SheetClose>
                        </div>
                        <SheetClose asChild>
                          <Link href={"/sign-up"} className="w-full">
                            <Button variant={"outline"} className="w-full">
                              Sign up
                            </Button>
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link href={"/sign-in"} className="w-full">
                            <Button variant={"default"} className="w-full">
                              Sign in
                            </Button>
                          </Link>
                        </SheetClose>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <hr />
    </header>
  );
}
