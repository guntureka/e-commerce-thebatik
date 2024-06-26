"use server";

import VerificationEmailTemplate from "@/components/email/verification-email";
import VerificationPasswordTemplate from "@/components/email/verification-password-template";
import { transporter } from "@/utils/mail";
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
    // const { data, error } = await resend.emails.send({
    //   from: "The Batik E-Commerce <onboarding@resend.dev>",
    //   to: [email],
    //   subject: "Email Verification",
    //   react: VerificationEmailTemplate({
    //     emailVerificationToken: emailVerificationToken,
    //   }),
    // });

    // if (error) {
    //   return error.message;
    // }

    // return data;
    const resetLink = `${process.env.NEXT_PUBLIC_URL}/verify-email?token=${emailVerificationToken}`;

    const res = await transporter.sendMail({
      from: "guntureka1020@gmail.com",
      to: email,
      subject: "New Password",
      html: `<p>Click <a href="${resetLink}">here</a> to verify your email.</p>`,
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const sendPasswordEmail = async ({
  email,
  emailVerificationToken,
}: SendEmailProps) => {
  try {
    // const { data, error } = await resend.emails.send({
    //   from: "The Batik E-Commerce <onboarding@resend.dev>",
    //   to: [email],
    //   subject: "New Password",
    //   react: VerificationPasswordTemplate({
    //     emailVerificationToken: emailVerificationToken,
    //   }),
    // });

    // if (error) {
    //   return error.message;
    // }

    // return data;

    const resetLink = `${process.env.NEXT_PUBLIC_URL}/new-password?token=${emailVerificationToken}`;

    const res = await transporter.sendMail({
      from: "guntureka1020@gmail.com",
      to: email,
      subject: "New Password",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};
