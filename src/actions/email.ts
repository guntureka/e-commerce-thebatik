"use server";

import VerificationEmailTemplate from "@/components/email/verification-email";
import VerificationPasswordTemplate from "@/components/email/verification-password-template";
import { resend } from "@/utils/resend";

interface SendEmailProps {
  email: string;
  emailVerificationToken: string;
}

export const sendEmail = async ({
  email,
  emailVerificationToken,
}: SendEmailProps) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "The Batik E-Commerce <onboarding@resend.dev>",
      to: [email],
      subject: "Email Verification",
      react: VerificationEmailTemplate({
        emailVerificationToken: emailVerificationToken,
      }),
    });

    if (error) {
      return error.message;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const sendPasswordEmail = async ({
  email,
  emailVerificationToken,
}: SendEmailProps) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "The Batik E-Commerce <onboarding@resend.dev>",
      to: [email],
      subject: "New Password",
      react: VerificationPasswordTemplate({
        emailVerificationToken: emailVerificationToken,
      }),
    });

    if (error) {
      return error.message;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};
