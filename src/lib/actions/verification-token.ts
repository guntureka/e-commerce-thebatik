import { db } from "@/utils/db";

export const createVerificationToken = async (data: any) => {
    try {
      const verificationToken = await db.verificationToken.create({ data });
      return verificationToken;
    } catch (error) {
      return null;
    }
  };
  

  export const getVerificationToken = async (identifier: string, token: string) => {
    try {
      const verificationToken = await db.verificationToken.findUnique({
        where: {
          identifier_token: {
            identifier,
            token,
          },
        },
      });
      return verificationToken;
    } catch (error) {
      return null;
    }
  };
  
  
  export const getAllVerificationTokens = async () => {
    try {
      const verificationTokens = await db.verificationToken.findMany({});
      return verificationTokens;
    } catch (error) {
      return null;
    }
  };
  
  
  export const updateVerificationToken = async (identifier: string, token: string, data: any) => {
    try {
      const verificationToken = await db.verificationToken.update({
        where: {
          identifier_token: {
            identifier,
            token,
          },
        },
        data,
      });
      return verificationToken;
    } catch (error) {
      return null;
    }
  };
  
  
  export const deleteVerificationToken = async (identifier: string, token: string) => {
    try {
      const verificationToken = await db.verificationToken.delete({
        where: {
          identifier_token: {
            identifier,
            token,
          },
        },
      });
      return verificationToken;
    } catch ( error ) {
        return null;
    }
  }