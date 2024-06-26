import { getVerificationPasswordTokenByToken } from "@/actions/password-verification-token";
import NewPasswordForm from "@/components/auth/new-password-form";
import SigninForm from "@/components/auth/signin-form";
import { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Forgot Password",
};

interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

const NewPasswordPage = async ({ searchParams }: SearchParamsProps) => {
  const token = searchParams.token;

  if (!token) {
    redirect("/");
  }

  const verifiedToken = await getVerificationPasswordTokenByToken(token);

  if (!verifiedToken) {
    redirect("/");
  }

  return (
    <main className="flex min-h-screen flex-col  justify-center lg:p-24 p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-evenly">
        <div className="hidden md:flex w-xl">
          <Image
            src={"/auth.png"}
            alt="auth"
            width={500}
            height={0}
            className="w-full"
          />
        </div>
        <div className="w-full p-5">
          <NewPasswordForm verificationToken={verifiedToken!} />
        </div>
      </div>
    </main>
  );
};

export default NewPasswordPage;
