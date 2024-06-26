import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

interface VerificationEmailTemplateProps {
  emailVerificationToken: string;
}

const VerificationEmailTemplate = ({
  emailVerificationToken,
}: VerificationEmailTemplateProps) => {
  return (
    <div>
      <span>Please verify your account first!</span>
      <a
        href={`${process.env.NEXT_PUBLIC_URL}/verify-email?token=${emailVerificationToken}`}
      >
        <button>Click Here</button>
      </a>
    </div>
  );
};

export default VerificationEmailTemplate;