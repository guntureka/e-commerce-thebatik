"use client";

import {
  emailVerified,
  generateNewVerificationTokenByToken,
  generateVerificationToken,
} from "@/actions/verification-token";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";

interface VerifyEmailComponentProps {
  error?: string;
  success?: string;
  code: number;
  token?: string;
}

const VerifyEmailComponent = ({
  error,
  success,
  code,
  token,
}: VerifyEmailComponentProps) => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleGenerateNewToken = () => {
    startTransition(async () => {
      await generateNewVerificationTokenByToken(token!).then((v) => {
        if (v) {
          toast({
            title: "Success!",
            description: "Generate new Token, please check your email!",
            variant: "success",
          });
        } else {
          toast({
            title: "Error!",
            description: "Token not generated",
            variant: "destructive",
          });
        }
      });
    });
  };

  if (success) {
    return (
      <main className="flex min-h-screen flex-col items-center space-y-10 justify-center lg:p-24 p-10">
        <h1 className="md:text-7xl text-4xl font-bold">Email Verified!</h1>
        <p className="text-sm">Thank you for verifying your email</p>
        <Link href={"/sign-in"}>
          <Button variant={"destructive"}>Go to sign in page</Button>
        </Link>
      </main>
    );
  } else if (code === 300) {
    return (
      <main className="flex min-h-screen flex-col items-center space-y-10 justify-center lg:p-24 p-10">
        <h1 className="md:text-7xl text-4xl font-bold">Email Not Verified!</h1>
        <p className="text-sm">Regenerate new token</p>

        <Button
          variant={"destructive"}
          onClick={handleGenerateNewToken}
          disabled={isPending}
        >
          Generate new Token
        </Button>
      </main>
    );
  } else {
    return (
      <main className="flex min-h-screen flex-col items-center space-y-10 justify-center lg:p-24 p-10">
        <h1 className="md:text-7xl text-4xl font-bold">Email Not Verified!</h1>
        <p className="text-sm">Token Not Found</p>
        <Link href={"/"}>
          <Button variant={"destructive"}>Go to Home page</Button>
        </Link>
      </main>
    );
  }
};

export default VerifyEmailComponent;
