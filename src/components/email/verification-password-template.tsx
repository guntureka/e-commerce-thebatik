import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

interface VerificationPasswordTemplateProps {
  emailVerificationToken: string;
}

const VerificationPasswordTemplate = ({
  emailVerificationToken,
}: VerificationPasswordTemplateProps) => {
  return (
    <div>
      <span>Change password! </span>
      <a
        href={`${process.env.NEXT_PUBLIC_URL}/new-password?token=${emailVerificationToken}`}
      >
        <button>Click Here</button>
      </a>
    </div>
  );
};

export default VerificationPasswordTemplate;
