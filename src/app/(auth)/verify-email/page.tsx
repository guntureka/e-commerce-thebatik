import { emailVerified } from "@/actions/verification-token";
import VerifyEmailComponent from "@/components/email/verification-email-page";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import React from "react";

interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

const VerifyEmailPage = async ({ searchParams }: SearchParamsProps) => {
  const token = searchParams.token;

  if (!token) {
    redirect("/");
  }

  const verifiedToken = await emailVerified(token!);

  return (
    <VerifyEmailComponent
      error={verifiedToken?.error}
      success={verifiedToken?.success}
      code={verifiedToken?.code!}
      token={token}
    />
  );
};

export default VerifyEmailPage;
