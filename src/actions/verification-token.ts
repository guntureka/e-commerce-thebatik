"use server";

import { db } from "@/utils/db";
import { generateToken } from "@/actions/token";
import { sendEmail } from "@/actions/email";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const data = await db.verificationToken.findUnique({
      where: {
        email,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const data = await db.verificationToken.findUnique({
      where: {
        token,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const generateVerificationToken = async (email: string) => {
  try {
    const existingToken = await getVerificationTokenByEmail(email);

    if (existingToken) {
      await db.verificationToken.delete({
        where: {
          id: existingToken.id,
        },
      });
    }

    const token = await generateToken();

    const verificationToken = await db.verificationToken.create({
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

export const generateNewVerificationTokenByToken = async (token: string) => {
  try {
    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken) {
      return null;
    }

    const generatedToken = await generateToken();

    const response = await db.verificationToken.update({
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
    const existingToken = await getVerificationTokenByToken(token!);

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

    await db.verificationToken.delete({
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
