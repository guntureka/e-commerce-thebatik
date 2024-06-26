"use server";

import { db } from "@/utils/db";
import { generateToken } from "@/actions/token";
import { sendEmail } from "@/actions/email";

export const getVerificationPasswordTokenByEmail = async (email: string) => {
  try {
    const data = await db.verificationPasswordToken.findUnique({
      where: {
        email,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getVerificationPasswordTokenByToken = async (token: string) => {
  try {
    const data = await db.verificationPasswordToken.findUnique({
      where: {
        token,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const generateVerificationPasswordToken = async (email: string) => {
  try {
    const existingToken = await getVerificationPasswordTokenByEmail(email);

    if (existingToken) {
      await db.verificationPasswordToken.delete({
        where: {
          id: existingToken.id,
        },
      });
    }

    const token = await generateToken();

    const verificationToken = await db.verificationPasswordToken.create({
      data: {
        email: email,
        ...token,
      },
    });

    return verificationToken;
  } catch (error) {
    console.log(error);
  }
};

export const generateNewVerificationPasswordTokenByToken = async (
  token: string
) => {
  try {
    const existingToken = await getVerificationPasswordTokenByToken(token);

    if (!existingToken) {
      return null;
    }

    const generatedToken = await generateToken();

    const response = await db.verificationPasswordToken.update({
      where: {
        id: existingToken.id,
      },
      data: {
        ...generatedToken,
      },
    });

    await sendEmail({
      email: response.email,
      emailVerificationToken: response.token,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const emailVerified = async (token: string | null) => {
  try {
    const existingToken = await getVerificationPasswordTokenByToken(token!);

    if (!existingToken) {
      return {
        error: "Invalid Token!",
        code: 400,
      };
    }

    const hasExpired = new Date() > existingToken.expires;

    if (hasExpired) {
      return {
        error: "Token expired!",
        code: 300,
      };
    }

    await db.user.update({
      where: {
        email: existingToken.email,
      },
      data: {
        emailVerified: new Date(),
      },
    });

    await db.verificationPasswordToken.delete({
      where: {
        id: existingToken.id,
      },
    });

    return {
      success: "Verified Successful",
      code: 200,
    };
  } catch (error) {
    console.log(error);
  }
};
