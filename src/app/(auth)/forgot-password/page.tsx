import ForgotPasswordForm from "@/components/auth/forgot-password-form";
import SigninForm from "@/components/auth/signin-form";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

export const metadata: Metadata = {
  title: "Forgot Password",
};

const ForgotPasswordPage = () => {
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
          <ForgotPasswordForm />
        </div>
      </div>
    </main>
  );
};

export default ForgotPasswordPage;
