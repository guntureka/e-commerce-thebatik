import { signinSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";

import { z } from "zod";


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Input  from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { signinAuth } from "@/lib/actions/auth";
import { useRouter } from "next/navigation";
import {User} from "@prisma/client";
import { auth } from "@/auth";
import { getUserById } from "@/lib/actions/user";
import Profile from "@/components/about-us/profile";
import ProfileForm from "@/components/account/profile-form";
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const AccountPage  = async () => {
  const session = await auth();
  if (!session) {
    return <div>loading session...</div>;
  }
  const user = await getUserById(session.user.id!);
  if (!user) {
    return <div>loading user...</div>;
  }
  

  return (
    <>
      <div className="flex flex-row justify-between font-[14px] mx-24 mt-10 mb-10">
        <h1>
          Home / <span className="font-bold">My Account</span>
        </h1>
        <h1>
          Welcome! <span className="text-[#DB4444]"> {user.name}</span>
        </h1>
      </div>
      <div className="container flex flex-row mt-20 gap-[100px] ">
        <div>
          <div className="text-[16px] mt-2 ">
            <Link href="/wishlist">
              <p className="font-bold">My Wishlist</p>
            </Link>
          </div>
        </div>

        <Card className="flex flex-col border-none outline-none shadow-none justify-center">
          <ProfileForm {...user}/>
        </Card>
      </div>
    </>
  );
}

export default AccountPage