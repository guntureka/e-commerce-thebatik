"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <main className="flex min-h-screen flex-col items-center space-y-10 justify-center p-24">
      <h1 className="text-7xl font-bold">404 NOT FOUND</h1>
      <p className="text-sm">
        Your visited page not found. You may go home page
      </p>
      <Link href={"/"}>
        <Button variant={"destructive"}>Back to home page</Button>
      </Link>
    </main>
  );
};

export default NotFound;
